import tensorflow as tf
from keras import backend as K
import segmentation_models as sm




def weighted_dice_loss_and_cross_entropy(weights):
    def loss(y_true, y_pred):
        # Categorical Cross-Entropy Loss with weights
        cce = tf.keras.losses.CategoricalCrossentropy()
        cce_loss = cce(y_true, y_pred)
        
        # Dice Loss
        dice_loss = sm.losses.DiceLoss()(y_true, y_pred)
        
        # Apply class weights
        weights_tensor = tf.convert_to_tensor(weights, dtype=tf.float32)
        
        weights_applied = K.sum(y_true * weights_tensor, axis=-1)
        
        # Final loss: weighted sum of Dice Loss and Categorical Cross-Entropy
        return K.mean(cce_loss * weights_applied + dice_loss)
    
    return loss


def UsedLossFunction():
    loaded_class_weights = {"0": 0.2793728385460172, "1": 2.7326509242950703, "2": 20.26962739925566, "3": 189.6078523997099}
    return weighted_dice_loss_and_cross_entropy(loaded_class_weights)
