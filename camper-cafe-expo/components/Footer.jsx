import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';

const Footer = () => {
    return (
        <View style={styles.footer}>
            <View style={styles.divider} />
            <TouchableOpacity onPress={() => Linking.openURL('https://www.freecodecamp.org')}>
                <Text style={styles.link}>Visit our website</Text>
            </TouchableOpacity>
            <Text style={styles.address}>123 Free Code Camp Drive</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        marginTop: 40,
        alignItems: 'center',
        paddingBottom: 20,
    },
    divider: {
        height: 3,
        backgroundColor: 'rgb(120, 30, 30)',
        width: '100%',
        marginVertical: 20,
    },
    link: {
        color: 'rgb(120, 30, 30)',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
    address: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
});

export default Footer;
