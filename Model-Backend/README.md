# 🏪 Inventory Management API

A Flask-based REST API for demand forecasting and inventory management using machine learning. This API provides real-time predictions, batch processing, and comprehensive inventory analysis.

## 🚀 Features

- **Demand Forecasting**: ML-powered predictions using your trained model
- **Real-time Analysis**: Instant inventory status and recommendations
- **Batch Processing**: Handle multiple items in a single request
- **Comprehensive Analytics**: Stock ratios, critical items, and insights
- **RESTful Design**: Clean JSON API with proper error handling
- **Interactive Documentation**: Built-in web interface for testing

## 📋 Requirements

- Python 3.8+
- Flask
- Your trained `demand_model.pkl` file

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Prepare Your Model

Ensure your `demand_model.pkl` file is in the same directory as `app.py`. The model should accept these features:
- Store ID
- Product ID  
- Inventory Level

### 3. Run the Server

```bash
python app.py
```

The API will be available at `http://localhost:5000`

### 4. Test the API

Run the test script to verify everything works:

```bash
python test_api.py
```

Or visit `http://localhost:5000` in your browser for interactive testing.

## 📖 API Endpoints

### Health Check
```http
GET /health
```

### Single Prediction
```http
POST /predict
Content-Type: application/json

{
  "Store ID": "S001",
  "Product ID": "P001",
  "Inventory Level": 200
}
```

### Batch Prediction
```http
POST /predict/batch
Content-Type: application/json

{
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
    }
  ]
}
```

### Inventory Analysis
```http
POST /inventory/analysis
Content-Type: application/json

{
  "items": [
    {
      "Store ID": "S001",
      "Product ID": "P001",
      "Inventory Level": 200
    }
  ]
}
```

## 📊 Response Format

### Single Prediction Response
```json
{
  "success": true,
  "input": {
    "Store ID": "S001",
    "Product ID": "P001",
    "Inventory Level": 200
  },
  "predictions": {
    "demand_forecast": 156.75,
    "current_inventory": 200,
    "stock_ratio": 0.78,
    "stock_status": "Good - Adequate inventory",
    "recommendation": "Monitor regularly"
  },
  "timestamp": "2024-07-14T10:30:00"
}
```

## 🛡️ Stock Status Categories

- **Critical**: Stock ratio > 1.5 (High demand, low inventory)
- **Warning**: Stock ratio > 1.0 (Demand exceeds inventory)  
- **Good**: Stock ratio > 0.7 (Adequate inventory)
- **Overstocked**: Stock ratio ≤ 0.7 (Low demand)

## 💻 Usage Examples

### Python
```python
import requests

# Single prediction
response = requests.post('http://localhost:5000/predict', json={
    "Store ID": "S001",
    "Product ID": "P001", 
    "Inventory Level": 200
})

result = response.json()
print(f"Predicted demand: {result['predictions']['demand_forecast']}")
print(f"Recommendation: {result['predictions']['recommendation']}")
```

### JavaScript
```javascript
fetch('http://localhost:5000/predict', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    'Store ID': 'S001',
    'Product ID': 'P001',
    'Inventory Level': 200
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

### cURL
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "Store ID": "S001",
    "Product ID": "P001",
    "Inventory Level": 200
  }'
```

## 🔧 Configuration

### Environment Variables
- `FLASK_ENV`: Set to `production` for production deployment
- `PORT`: Custom port (default: 5000)

### Model Requirements
Your `demand_model.pkl` should be a scikit-learn compatible model that:
1. Accepts a pandas DataFrame with columns: `['Store ID', 'Product ID', 'Inventory Level']`
2. Returns numeric predictions
3. Is saved using `joblib.dump()`

## 🚀 Deployment

### Local Development
```bash
python app.py
```

### Production (using Gunicorn)
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Docker
```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 5000

CMD ["python", "app.py"]
```

## 🐛 Troubleshooting

### Common Issues

1. **Model not found**: Ensure `demand_model.pkl` is in the same directory as `app.py`
2. **Import errors**: Run `pip install -r requirements.txt`
3. **Prediction errors**: Check that your model expects the correct input format
4. **CORS issues**: The API includes CORS headers for web browser access

### Error Responses
```json
{
  "error": "Missing required fields",
  "missing_fields": ["Product ID"],
  "required_fields": ["Store ID", "Product ID", "Inventory Level"]
}
```

## 📝 API Logs

The API includes comprehensive logging:
- Request/response logging
- Error tracking  
- Model prediction logs
- Performance monitoring

Check console output for debugging information.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation at `http://localhost:5000`
3. Run `python test_api.py` to verify setup
4. Check server logs for error details

---

Made with ❤️ for inventory management optimization
