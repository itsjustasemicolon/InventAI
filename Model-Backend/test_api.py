"""
Test script for the Inventory Management API
Run this script to test all API endpoints
"""

import requests
import json
import time

# API base URL
BASE_URL = "http://localhost:5000"

def test_health():
    """Test the health endpoint"""
    print("\n🏥 Testing Health Endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"Error: {e}")

def test_single_prediction():
    """Test single item prediction"""
    print("\n🔮 Testing Single Prediction...")
    
    data = {
        "Store ID": "S001",
        "Product ID": "P001",
        "Inventory Level": 200
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/predict", 
            json=data,
            headers={'Content-Type': 'application/json'}
        )
        print(f"Status Code: {response.status_code}")
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2)}")
        
        if result.get('success'):
            predictions = result.get('predictions', {})
            print(f"\n📊 Prediction Summary:")
            print(f"Demand Forecast: {predictions.get('demand_forecast')}")
            print(f"Stock Status: {predictions.get('stock_status')}")
            print(f"Recommendation: {predictions.get('recommendation')}")
            
    except Exception as e:
        print(f"Error: {e}")

def test_batch_prediction():
    """Test batch prediction"""
    print("\n📦 Testing Batch Prediction...")
    
    data = {
        "items": [
            {
                "Store ID": "S001",
                "Product ID": "P001",
                "Inventory Level": 200
            },
            {
                "Store ID": "S002",
                "Product ID": "P002",
                "Inventory Level": 150
            },
            {
                "Store ID": "S003",
                "Product ID": "P003",
                "Inventory Level": 300
            }
        ]
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/predict/batch", 
            json=data,
            headers={'Content-Type': 'application/json'}
        )
        print(f"Status Code: {response.status_code}")
        result = response.json()
        
        if result.get('success'):
            print(f"Successful Predictions: {result.get('successful_predictions')}")
            print(f"Failed Predictions: {result.get('failed_predictions')}")
            
            # Show first few predictions
            predictions = result.get('predictions', [])
            for i, pred in enumerate(predictions[:3]):
                print(f"\nItem {i+1}:")
                print(f"  Store: {pred['input']['Store ID']}")
                print(f"  Product: {pred['input']['Product ID']}")
                print(f"  Demand Forecast: {pred['demand_forecast']}")
                print(f"  Stock Ratio: {pred['stock_ratio']}")
        else:
            print(f"Response: {json.dumps(result, indent=2)}")
            
    except Exception as e:
        print(f"Error: {e}")

def test_inventory_analysis():
    """Test inventory analysis endpoint"""
    print("\n📈 Testing Inventory Analysis...")
    
    data = {
        "items": [
            {
                "Store ID": "S001",
                "Product ID": "P001",
                "Inventory Level": 50  # Low inventory
            },
            {
                "Store ID": "S002",
                "Product ID": "P002",
                "Inventory Level": 500  # High inventory
            },
            {
                "Store ID": "S003",
                "Product ID": "P003",
                "Inventory Level": 200  # Medium inventory
            }
        ]
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/inventory/analysis", 
            json=data,
            headers={'Content-Type': 'application/json'}
        )
        print(f"Status Code: {response.status_code}")
        result = response.json()
        
        if result.get('success'):
            summary = result.get('summary', {})
            print(f"\n📊 Analysis Summary:")
            print(f"Total Items: {summary.get('total_items_analyzed')}")
            print(f"Total Inventory: {summary.get('total_inventory_value')}")
            print(f"Total Predicted Demand: {summary.get('total_predicted_demand')}")
            print(f"Overall Stock Ratio: {summary.get('overall_stock_ratio')}")
            print(f"Critical Items: {summary.get('critical_items_count')}")
            print(f"Overstocked Items: {summary.get('overstocked_items_count')}")
            
            # Show critical items if any
            critical_items = result.get('critical_items', [])
            if critical_items:
                print(f"\n⚠️ Critical Items:")
                for item in critical_items:
                    print(f"  {item['store_id']}-{item['product_id']}: Ratio {item['stock_ratio']}")
        else:
            print(f"Response: {json.dumps(result, indent=2)}")
            
    except Exception as e:
        print(f"Error: {e}")

def test_error_handling():
    """Test error handling"""
    print("\n❌ Testing Error Handling...")
    
    # Test missing fields
    data = {
        "Store ID": "S001",
        # Missing Product ID and Inventory Level
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/predict", 
            json=data,
            headers={'Content-Type': 'application/json'}
        )
        print(f"Missing fields test - Status Code: {response.status_code}")
        result = response.json()
        print(f"Error message: {result.get('error')}")
        print(f"Missing fields: {result.get('missing_fields')}")
        
    except Exception as e:
        print(f"Error: {e}")

def main():
    """Run all tests"""
    print("🚀 Starting API Tests...")
    print("Make sure the Flask server is running on http://localhost:5000")
    
    # Wait a moment for user to read
    time.sleep(2)
    
    # Run all tests
    test_health()
    test_single_prediction()
    test_batch_prediction()
    test_inventory_analysis()
    test_error_handling()
    
    print("\n✅ All tests completed!")
    print("\nNote: If you see connection errors, make sure to:")
    print("1. Install requirements: pip install -r requirements.txt")
    print("2. Place your demand_model.pkl file in the same directory")
    print("3. Run the Flask server: python app.py")

if __name__ == "__main__":
    main()
