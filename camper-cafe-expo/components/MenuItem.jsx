import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MenuItem = ({ name, price }) => {
    return (
        <View style={styles.menuItem}>
            <Text style={styles.itemName}>{name}</Text>
            <Text style={styles.itemPrice}>{parseFloat(price).toFixed(2)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 5,
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1,
    },
    itemPrice: {
        color: '#4CAF50',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10,
    },
});

export default MenuItem;
