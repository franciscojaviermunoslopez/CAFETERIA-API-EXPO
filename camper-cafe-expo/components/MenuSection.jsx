import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MenuItem from './MenuItem';
import ProductForm from './ProductForm';

function MenuSection({ title, image, items, categoryIndex, onCreateProduct, onUpdateProduct, onDeleteProduct }) {
    const [showProductForm, setShowProductForm] = useState(false);
    const [editingProductIndex, setEditingProductIndex] = useState(null);

    const handleAdd = () => {
        setEditingProductIndex(null);
        setShowProductForm(true);
    };

    const handleEdit = (index) => {
        setEditingProductIndex(index);
        setShowProductForm(true);
    };

    const handleSave = (name, price) => {
        if (editingProductIndex !== null) {
            onUpdateProduct(categoryIndex, editingProductIndex, name, price);
        } else {
            onCreateProduct(categoryIndex, name, price);
        }
        setShowProductForm(false);
        setEditingProductIndex(null);
    };

    const handleCancel = () => {
        setShowProductForm(false);
        setEditingProductIndex(null);
    };

    const handleDelete = (index) => {
        onDeleteProduct(categoryIndex, index);
    };

    return (
        <View style={styles.menuSection}>

            <Text style={styles.sectionTitle}>{title}</Text>

            <View style={styles.sectionIcon}>
                <Image source={{ uri: image }} style={styles.iconImage} />
            </View>

            <View style={styles.addProductContainer}>
                <TouchableOpacity onPress={handleAdd} style={styles.btnAddProduct}>
                    <Text style={styles.btnAddProductText}>Añadir Producto</Text>
                </TouchableOpacity>
            </View>

            {showProductForm && (
                <ProductForm
                    initialName={editingProductIndex !== null ? items[editingProductIndex].name : ''}
                    initialPrice={editingProductIndex !== null ? items[editingProductIndex].price : ''}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    isEditing={editingProductIndex !== null}
                />
            )}

            <View style={styles.itemsContainer}>
                {items.length === 0 ? (
                    <Text style={styles.noProducts}>
                        No hay productos en esta categoría
                    </Text>
                ) : (
                    items.map((item, index) => (
                        <View key={index} style={styles.productWrapper}>

                            <MenuItem name={item.name} price={item.price} />

                            <View style={styles.productButtons}>
                                <TouchableOpacity onPress={() => handleEdit(index)} style={[styles.btnSmall, styles.btnEdit]}>
                                    <Text style={styles.btnSmallText}>Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDelete(index)} style={[styles.btnSmall, styles.btnDelete]}>
                                    <Text style={styles.btnSmallText}>Eliminar</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    ))
                )}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    menuSection: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#8B4513',
        marginBottom: 20,
    },
    sectionTitle: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    sectionIcon: {
        alignItems: 'center',
        marginBottom: 20,
    },
    iconImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#8B4513',
    },
    addProductContainer: {
        alignItems: 'center',
        marginBottom: 15,
    },
    btnAddProduct: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#FF9800',
        borderRadius: 6,
    },
    btnAddProductText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    itemsContainer: {
        marginTop: 20,
    },
    noProducts: {
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#999',
        padding: 15,
    },
    productWrapper: {
        marginBottom: 10,
    },
    productButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 5,
    },
    btnSmall: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 4,
        marginLeft: 5,
    },
    btnEdit: {
        backgroundColor: '#2196F3',
    },
    btnDelete: {
        backgroundColor: '#f44336',
    },
    btnSmallText: {
        color: 'white',
        fontSize: 12,
    },
});

export default MenuSection;
