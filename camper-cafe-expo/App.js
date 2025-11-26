import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, ImageBackground, SafeAreaView } from 'react-native';
import Header from './components/Header';
import Footer from './components/Footer';
import MenuSection from './components/MenuSection';
import CategoryForm from './components/CategoryForm';

import {
  getCategorias,
  crearCategoria,
  editarCategoria,
  borrarCategoria,
  getProductos,
  crearProducto,
  editarProducto,
  borrarProducto
} from './services/api';

export default function App() {
  const [categories, setCategories] = useState([]);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategoryIndex, setEditingCategoryIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    setLoading(true);

    const response = await getCategorias();
    const cats = response.data || [];

    const categoriasCompletas = [];
    for (let cat of cats) {
      const prodsResponse = await getProductos(cat.id);
      const prods = prodsResponse.data || [];

      categoriasCompletas.push({
        id: cat.id,
        category: cat.nombre,
        image: "https://cdn.freecodecamp.org/curriculum/css-cafe/coffee.jpg",
        items: prods.map(p => ({
          id: p.id,
          name: p.nombre,
          price: parseFloat(p.precio)
        }))
      });
    }

    setCategories(categoriasCompletas);
    setLoading(false);
  }

  // ===== CATEGORÍAS =====

  async function handleCreateCategory(name) {
    await crearCategoria(name);
    await cargarDatos();
    setShowCategoryForm(false);
  }

  async function handleUpdateCategory(index, newName) {
    const cat = categories[index];
    await editarCategoria(cat.id, newName);
    await cargarDatos();
    setShowCategoryForm(false);
    setEditingCategoryIndex(null);
  }

  async function handleDeleteCategory(index) {
    const cat = categories[index];

    if (cat.items.length > 0) {
      Alert.alert(
        "Confirmar eliminación",
        `¿Eliminar "${cat.category}" y sus ${cat.items.length} productos?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Eliminar",
            style: "destructive",
            onPress: async () => {
              await borrarCategoria(cat.id);
              await cargarDatos();
            }
          }
        ]
      );
    } else {
      await borrarCategoria(cat.id);
      await cargarDatos();
    }
  }

  // ===== PRODUCTOS =====

  async function handleCreateProduct(categoryIndex, name, price) {
    const cat = categories[categoryIndex];
    await crearProducto(cat.id, name, price);
    await cargarDatos();
  }

  async function handleUpdateProduct(categoryIndex, productIndex, name, price) {
    const prod = categories[categoryIndex].items[productIndex];
    await editarProducto(prod.id, name, price);
    await cargarDatos();
  }

  async function handleDeleteProduct(categoryIndex, productIndex) {
    const prod = categories[categoryIndex].items[productIndex];

    Alert.alert(
      "Confirmar eliminación",
      `¿Eliminar "${prod.name}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            await borrarProducto(prod.id);
            await cargarDatos();
          }
        }
      ]
    );
  }

  // ===== BOTONES =====

  function handleAddCategory() {
    setEditingCategoryIndex(null);
    setShowCategoryForm(true);
  }

  function handleEditCategory(index) {
    setEditingCategoryIndex(index);
    setShowCategoryForm(true);
  }

  function handleSaveCategory(name) {
    if (editingCategoryIndex !== null) {
      handleUpdateCategory(editingCategoryIndex, name);
    } else {
      handleCreateCategory(name);
    }
  }

  function handleCancelCategory() {
    setShowCategoryForm(false);
    setEditingCategoryIndex(null);
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri: 'https://cdn.freecodecamp.org/curriculum/css-cafe/beans.jpg' }} style={styles.backgroundImage}>
          <View style={styles.menuCard}>
            <Header />
            <View style={styles.menuMain}>
              <Text style={styles.emptyMessage}>Cargando...</Text>
            </View>
            <Footer />
          </View>
        </ImageBackground>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={{ uri: 'https://cdn.freecodecamp.org/curriculum/css-cafe/beans.jpg' }} style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.menuCard}>

            <Header />

            <View style={styles.menuMain}>

              <View style={styles.addCategoryContainer}>
                <TouchableOpacity onPress={handleAddCategory} style={styles.btnAdd}>
                  <Text style={styles.btnAddText}>Añadir Categoría</Text>
                </TouchableOpacity>
              </View>

              {showCategoryForm && (
                <CategoryForm
                  initialValue={editingCategoryIndex !== null ? categories[editingCategoryIndex].category : ''}
                  onSave={handleSaveCategory}
                  onCancel={handleCancelCategory}
                  isEditing={editingCategoryIndex !== null}
                />
              )}

              {categories.length === 0 ? (
                <Text style={styles.emptyMessage}>
                  No hay categorías. ¡Añade una!
                </Text>
              ) : (
                categories.map((category, index) => (
                  <View key={category.id} style={styles.categoryWrapper}>

                    <View style={styles.categoryButtons}>
                      <TouchableOpacity
                        onPress={() => handleEditCategory(index)}
                        style={[styles.btnEdit, styles.btnCategoryAction]}
                      >
                        <Text style={styles.btnText}>Editar Categoría</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDeleteCategory(index)}
                        style={[styles.btnDelete, styles.btnCategoryAction]}
                      >
                        <Text style={styles.btnText}>Eliminar Categoría</Text>
                      </TouchableOpacity>
                    </View>

                    <MenuSection
                      title={category.category}
                      image={category.image}
                      items={category.items}
                      categoryIndex={index}
                      onCreateProduct={handleCreateProduct}
                      onUpdateProduct={handleUpdateProduct}
                      onDeleteProduct={handleDeleteProduct}
                    />
                  </View>
                ))
              )}

            </View>

            <Footer />

          </View>
        </ScrollView>
      </ImageBackground>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  menuCard: {
    backgroundColor: 'rgb(232, 206, 171)',
    width: '100%',
    maxWidth: 800,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  menuMain: {
    marginTop: 20,
    marginBottom: 40,
  },
  addCategoryContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryWrapper: {
    marginBottom: 40,
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 15,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
    padding: 20,
  },
  btnAdd: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  btnAddText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnCategoryAction: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  btnEdit: {
    backgroundColor: '#2196F3',
  },
  btnDelete: {
    backgroundColor: '#f44336',
  },
  btnText: {
    color: 'white',
    fontSize: 14,
  },
});
