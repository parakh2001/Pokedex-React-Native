// components/PokemonCard.js
import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const PokemonCard = ({ pokemon, index, navigation }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Details', { pokemon, index })}>
            <Image
                source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png` }}
                style={styles.image}
            />
            <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>
        </TouchableOpacity>
    );
};

// Use memo to prevent unnecessary re-renders
export default memo(PokemonCard);

const styles = StyleSheet.create({
    card: { flex: 1, alignItems: 'center', margin: 10, padding: 10, backgroundColor: '#f8f8f8', borderRadius: 10 },
    image: { width: 100, height: 100 },
    name: { marginTop: 5, fontWeight: 'bold' }
});
