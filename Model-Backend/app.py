from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import os
from datetime import datetime, timedelta
import logging
from typing import Dict, List, Any
import traceback

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

class InventoryPredictor:
    def __init__(self, model_path: str = 'demand_model.pkl'):
        """Initialize the inventory predictor with the trained model."""
        self.model_path = model_path
        self.model = None
        self.load_model()
        
    def load_model(self):
        """Load the trained demand forecasting model."""
        try:
            if os.path.exists(self.model_path):
                self.model = joblib.load(self.model_path)
                logger.info(f"Model loaded successfully from {self.model_path}")
            else:
                logger.error(f"Model file not found: {self.model_path}")
                raise FileNotFoundError(f"Model file not found: {self.model_path}")
        except Exception as e:
            logger.error(f"Error loading model: {str(e)}")
            raise e
    
    def prepare_input_data(self, input_data: Dict) -> pd.DataFrame:
        """
        Prepare input data for prediction based on your model's expected features.
        Based on your notebook, the simplified model expects:
        ['Store ID', 'Product ID', 'Inventory Level']
        """
        try:
            # Create DataFrame from input
            df = pd.DataFrame([input_data])
            
            # Ensure required columns exist
            required_columns = ['Store ID', 'Product ID', 'Inventory Level']
            
            for col in required_columns:
                if col not in df.columns:
                    raise ValueError(f"Missing required column: {col}")
            
            # Convert data types
            df['Store ID'] = df['Store ID'].astype(str)
            df['Product ID'] = df['Product ID'].astype(str)
            df['Inventory Level'] = pd.to_numeric(df['Inventory Level'])
            
            return df[required_columns]
            
        except Exception as e:
            logger.error(f"Error preparing input data: {str(e)}")
            raise e
    
    def predict_demand(self, input_data: Dict) -> float:
        """Predict demand for given input parameters."""
        try:
            if self.model is None:
                raise ValueError("Model not loaded")
            
            # Prepare input data
            df = self.prepare_input_data(input_data)
            
            # Make prediction
            prediction = self.model.predict(df)[0]
            
            # Ensure prediction is not negative
            prediction = max(0, prediction)
            
            logger.info(f"Prediction made: {prediction}")
            return float(prediction)
            
        except Exception as e:
            logger.error(f"Error making prediction: {str(e)}")
            raise e

# Initialize the predictor
try:
    predictor = InventoryPredictor()
except Exception as e:
    logger.error(f"Failed to initialize predictor: {str(e)}")
    predictor = None

@app.route('/')
def home():
    """Home page with API documentation."""
    return render_template('index.html')

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'model_loaded': predictor is not None and predictor.model is not None,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict demand for given inventory parameters.
    
    Expected JSON input:
    {
        "Store ID": "S001",
        "Product ID": "P001", 
        "Inventory Level": 200
    }
    """
    try:
        # Check if predictor is available
        if predictor is None or predictor.model is None:
            return jsonify({
                'error': 'Model not available',
                'message': 'The prediction model is not loaded'
            }), 500
        
        # Get JSON data from request
        data = request.get_json()
        
        if not data:
            return jsonify({
                'error': 'No data provided',
                'message': 'Please provide JSON data in the request body'
            }), 400
        
        # Validate required fields
        required_fields = ['Store ID', 'Product ID', 'Inventory Level']
        missing_fields = [field for field in required_fields if field not in data]
        
        if missing_fields:
            return jsonify({
                'error': 'Missing required fields',
                'missing_fields': missing_fields,
                'required_fields': required_fields
            }), 400
        
        # Make prediction
        predicted_demand = predictor.predict_demand(data)
        
        # Calculate additional insights
        inventory_level = float(data['Inventory Level'])
        stock_ratio = predicted_demand / inventory_level if inventory_level > 0 else 0
        
        # Determine stock status
        if stock_ratio > 1.5:
            stock_status = "Critical - High demand, low inventory"
            recommendation = "Urgent restocking required"
        elif stock_ratio > 1.0:
            stock_status = "Warning - Demand exceeds inventory"
            recommendation = "Consider restocking soon"
        elif stock_ratio > 0.7:
            stock_status = "Good - Adequate inventory"
            recommendation = "Monitor regularly"
        else:
            stock_status = "Overstocked - Low demand"
            recommendation = "Consider reducing inventory or promotions"
        
        # Prepare response
        response = {
            'success': True,
            'input': data,
            'predictions': {
                'demand_forecast': round(predicted_demand, 2),
                'current_inventory': inventory_level,
                'stock_ratio': round(stock_ratio, 2),
                'stock_status': stock_status,
                'recommendation': recommendation
            },
            'timestamp': datetime.now().isoformat()
        }
        
        return jsonify(response)
        
    except ValueError as e:
        return jsonify({
            'error': 'Validation error',
            'message': str(e)
        }), 400
        
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({
            'error': 'Internal server error',
            'message': 'An error occurred during prediction'
        }), 500

@app.route('/predict/batch', methods=['POST'])
def predict_batch():
    """
    Predict demand for multiple inventory items.
    
    Expected JSON input:
    {
        "items": [
            {"Store ID": "S001", "Product ID": "P001", "Inventory Level": 200},
            {"Store ID": "S002", "Product ID": "P002", "Inventory Level": 150}
        ]
    }
    """
    try:
        if predictor is None or predictor.model is None:
            return jsonify({
                'error': 'Model not available',
                'message': 'The prediction model is not loaded'
            }), 500
        
        data = request.get_json()
        
        if not data or 'items' not in data:
            return jsonify({
                'error': 'Invalid data format',
                'message': 'Please provide "items" array in the request body'
            }), 400
        
        items = data['items']
        if not isinstance(items, list) or len(items) == 0:
            return jsonify({
                'error': 'Invalid items format',
                'message': 'Items should be a non-empty array'
            }), 400
        
        predictions = []
        errors = []
        
        for i, item in enumerate(items):
            try:
                predicted_demand = predictor.predict_demand(item)
                inventory_level = float(item['Inventory Level'])
                stock_ratio = predicted_demand / inventory_level if inventory_level > 0 else 0
                
                predictions.append({
                    'index': i,
                    'input': item,
                    'demand_forecast': round(predicted_demand, 2),
                    'stock_ratio': round(stock_ratio, 2)
                })
                
            except Exception as e:
                errors.append({
                    'index': i,
                    'item': item,
                    'error': str(e)
                })
        
        return jsonify({
            'success': True,
            'predictions': predictions,
            'errors': errors,
            'total_items': len(items),
            'successful_predictions': len(predictions),
            'failed_predictions': len(errors),
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Batch prediction error: {str(e)}")
        return jsonify({
            'error': 'Internal server error',
            'message': 'An error occurred during batch prediction'
        }), 500

@app.route('/inventory/analysis', methods=['POST'])
def inventory_analysis():
    """
    Perform comprehensive inventory analysis.
    
    Expected JSON input:
    {
        "items": [
            {"Store ID": "S001", "Product ID": "P001", "Inventory Level": 200},
            {"Store ID": "S002", "Product ID": "P002", "Inventory Level": 150}
        ]
    }
    """
    try:
        if predictor is None or predictor.model is None:
            return jsonify({
                'error': 'Model not available',
                'message': 'The prediction model is not loaded'
            }), 500
        
        data = request.get_json()
        
        if not data or 'items' not in data:
            return jsonify({
                'error': 'Invalid data format',
                'message': 'Please provide "items" array in the request body'
            }), 400
        
        items = data['items']
        results = []
        total_inventory = 0
        total_predicted_demand = 0
        critical_items = []
        overstocked_items = []
        
        for item in items:
            try:
                predicted_demand = predictor.predict_demand(item)
                inventory_level = float(item['Inventory Level'])
                stock_ratio = predicted_demand / inventory_level if inventory_level > 0 else 0
                
                total_inventory += inventory_level
                total_predicted_demand += predicted_demand
                
                analysis = {
                    'store_id': item['Store ID'],
                    'product_id': item['Product ID'],
                    'current_inventory': inventory_level,
                    'predicted_demand': round(predicted_demand, 2),
                    'stock_ratio': round(stock_ratio, 2),
                    'days_of_stock': round(inventory_level / predicted_demand, 1) if predicted_demand > 0 else float('inf')
                }
                
                if stock_ratio > 1.5:
                    critical_items.append(analysis)
                elif stock_ratio < 0.5:
                    overstocked_items.append(analysis)
                
                results.append(analysis)
                
            except Exception as e:
                logger.error(f"Error analyzing item {item}: {str(e)}")
                continue
        
        # Overall analysis
        overall_stock_ratio = total_predicted_demand / total_inventory if total_inventory > 0 else 0
        
        summary = {
            'total_items_analyzed': len(results),
            'total_inventory_value': round(total_inventory, 2),
            'total_predicted_demand': round(total_predicted_demand, 2),
            'overall_stock_ratio': round(overall_stock_ratio, 2),
            'critical_items_count': len(critical_items),
            'overstocked_items_count': len(overstocked_items)
        }
        
        return jsonify({
            'success': True,
            'summary': summary,
            'detailed_analysis': results,
            'critical_items': critical_items[:10],  # Top 10 critical items
            'overstocked_items': overstocked_items[:10],  # Top 10 overstocked items
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Inventory analysis error: {str(e)}")
        return jsonify({
            'error': 'Internal server error',
            'message': 'An error occurred during inventory analysis'
        }), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    # Ensure the model file exists
    if not os.path.exists('demand_model.pkl'):
        logger.warning("demand_model.pkl not found. Please ensure the model file is in the same directory as app.py")
    
    # Run the Flask app
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True  # Set to False in production
    )
