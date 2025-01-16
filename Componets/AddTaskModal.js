import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Pressable,
} from "react-native";

export default function AddTask({ isVisible, onClose, onAddTask }) {
  const [TextTasks, setTexTasks] = useState("");

  const addTasks = () => {
    if (TextTasks.trim() === "") return;

    const newTask = {
      id: Date.now().toString(),
      Task: TextTasks,
      status: false,
    };

    onAddTask(newTask);
    setTexTasks("");
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onClose}
      animationType="fade"
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardView}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Nueva Tarea</Text>
              <TextInput
                style={styles.modalText}
                placeholder="Nueva tarea"
                value={TextTasks}
                onChangeText={setTexTasks}
              />

              <View style={styles.modalBottom}>
                <Pressable style={styles.modalButton} onPress={addTasks}><Text style={{color: '#fff', fontSize: 18}}>Guardar</Text></Pressable>
                <Pressable style={styles.modalButton} onPress={() => onClose()}><Text style={{color: '#fff', fontSize: 18}}>Cancelar</Text></Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
  },
  keyboardView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    width: "100%",
    fontSize: 18,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#f3f3f3",
  },
  modalBottom: {
    flexDirection: 'row',
  },
  modalButton: {
    backgroundColor: '#000000',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 14,
    marginLeft: 20,
    marginRight: 20
  }
});
