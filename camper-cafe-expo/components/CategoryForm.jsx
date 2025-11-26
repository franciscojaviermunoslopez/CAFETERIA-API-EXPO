import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

function CategoryForm({ initialValue = '', onSave, onCancel, isEditing }) {
    const [name, setName] = useState(initialValue);

    const handleSubmit = () => {
        if (name.trim() === '') {
            Alert.alert('Error', 'El nombre no puede estar vacío');
            return;
        }

        onSave(name.trim());
        setName('');
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.title}>{isEditing ? ' Editar Categoría' : ' Nueva Categoría'}</Text>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Nombre de la categoría:</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Ej: Bebidas"
                />
            </View>

            <View style={styles.formButtons}>
                <TouchableOpacity onPress={onCancel} style={styles.btnCancel}>
                    <Text style={styles.btnText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmit} style={styles.btnSave}>
                    <Text style={styles.btnText}>{isEditing ? 'Guardar' : 'Crear'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: '#e3f2fd',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#2196F3',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: 'white',
    },
    formButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 15,
    },
    btnCancel: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#757575',
        borderRadius: 5,
        marginRight: 10,
    },
    btnSave: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default CategoryForm;
