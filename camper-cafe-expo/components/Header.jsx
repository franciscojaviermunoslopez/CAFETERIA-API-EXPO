import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.mainTitle}>CAMPER CAFE</Text>
            <Text style={styles.established}>Est. 2020</Text>
            <View style={styles.divider} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        marginBottom: 40,
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: 40, // Reduced from 56 to fit mobile screens better
        fontWeight: 'bold',
        marginBottom: 10,
        letterSpacing: 2,
        textAlign: 'center',
    },
    established: {
        fontSize: 20,
        fontStyle: 'italic',
        marginBottom: 20,
    },
    divider: {
        height: 3,
        backgroundColor: 'rgb(120, 30, 30)',
        width: '100%',
        marginVertical: 20,
    },
});

export default Header;
