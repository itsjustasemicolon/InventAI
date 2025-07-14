"""
Simple deployment and setup script for the Inventory Management API
"""

import os
import sys
import subprocess
import pkg_resources

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 8):
        print("❌ Python 3.8 or higher is required")
        return False
    print(f"✅ Python {sys.version.split()[0]} detected")
    return True

def install_requirements():
    """Install required packages"""
    print("\n📦 Installing required packages...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ All packages installed successfully")
        return True
    except subprocess.CalledProcessError:
        print("❌ Failed to install packages")
        return False

def check_model_file():
    """Check if the model file exists"""
    if os.path.exists("demand_model.pkl"):
        print("✅ demand_model.pkl found")
        return True
    else:
        print("⚠️ demand_model.pkl not found in current directory")
        print("Please copy your trained model file to this directory")
        return False

def create_directories():
    """Create necessary directories"""
    directories = ["templates", "static", "logs"]
    for directory in directories:
        if not os.path.exists(directory):
            os.makedirs(directory)
            print(f"📁 Created directory: {directory}")

def run_tests():
    """Run basic tests"""
    print("\n🧪 Running basic tests...")
    try:
        # Test imports
        import flask
        import pandas
        import numpy
        import sklearn
        import joblib
        print("✅ All required modules can be imported")
        return True
    except ImportError as e:
        print(f"❌ Import error: {e}")
        return False

def start_server():
    """Start the Flask server"""
    print("\n🚀 Starting the Flask server...")
    print("Server will be available at: http://localhost:5000")
    print("Press Ctrl+C to stop the server")
    print("-" * 50)
    
    try:
        subprocess.run([sys.executable, "app.py"])
    except KeyboardInterrupt:
        print("\n👋 Server stopped")

def main():
    """Main setup function"""
    print("🏪 Inventory Management API Setup")
    print("=" * 40)
    
    # Check Python version
    if not check_python_version():
        return
    
    # Install requirements
    if not install_requirements():
        return
    
    # Create directories
    create_directories()
    
    # Check model file
    model_exists = check_model_file()
    
    # Run tests
    if not run_tests():
        return
    
    print("\n✅ Setup completed successfully!")
    
    if model_exists:
        print("\n🎯 Everything is ready!")
        print("Options:")
        print("1. Start server: python app.py")
        print("2. Run tests: python test_api.py")
        print("3. View docs: http://localhost:5000 (after starting server)")
        
        response = input("\nStart server now? (y/n): ").lower().strip()
        if response in ['y', 'yes']:
            start_server()
    else:
        print("\n⚠️ Setup incomplete:")
        print("1. Copy your demand_model.pkl file to this directory")
        print("2. Run: python app.py")
        
if __name__ == "__main__":
    main()
