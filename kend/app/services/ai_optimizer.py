import tensorflow as tf
import numpy as np
from typing import List, Dict

class AIOptimizer:
    def __init__(self):
        self.model = self._build_model()
    
    def _build_model(self):
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(64, activation='relu', input_shape=(10,)),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.Dense(32, activation='relu'),
            tf.keras.layers.Dense(16, activation='relu'),
            tf.keras.layers.Dense(1, activation='sigmoid')
        ])
        
        model.compile(optimizer='adam',
                     loss='binary_crossentropy',
                     metrics=['accuracy'])
        return model
    
    def predict_improvements(self, metrics: Dict) -> List[Dict]:
        # Metrikleri model inputuna dönüştür
        input_data = self._prepare_input_data(metrics)
        
        # Tahmin yap
        predictions = self.model.predict(input_data)
        
        # Tahminleri önerilere dönüştür
        return self._generate_recommendations(predictions, metrics)
    
    def _prepare_input_data(self, metrics: Dict) -> np.ndarray:
        # Metrikleri normalize et ve model inputuna dönüştür
        features = [
            metrics.get('load_time', 0),
            metrics.get('page_size', 0),
            len(metrics.get('keywords', [])),
            metrics.get('title', {}).get('length', 0),
            metrics.get('meta', {}).get('length', 0)
        ]
        return np.array(features).reshape(1, -1) 