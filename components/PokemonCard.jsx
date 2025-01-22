import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // LinearGradient for gradient effect
import { useNavigation } from '@react-navigation/native';
import { Animated } from 'react-native';

const PokemonCard = ({ pokemon, index }) => {
    const navigation = useNavigation();
    const [scale, setScale] = React.useState(new Animated.Value(1));

    const onPressIn = () => {
        Animated.spring(scale, {
            toValue: 1.05, // Slightly scale up on press
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(scale, {
            toValue: 1, // Reset scale back to normal
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity
            style={styles.card}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={() => navigation.navigate('Details', { pokemon, index })}
        >
            {/* Gradient background and image */}
            <LinearGradient
                colors={['#FF6347', '#FF4500']} // Gradient for the card background
                style={styles.gradientBackground}
            >
                <Image
                    source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png` }}
                    style={styles.image}
                />
            </LinearGradient>

            {/* Pokémon name */}
            <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>
        </TouchableOpacity>
    );
};

// Memoize to prevent unnecessary re-renders
export default memo(PokemonCard);

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 10,
        padding: 10,
        borderRadius: 15, // Rounded corners for a soft, clean look
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 8, // Enhanced shadow for Android devices
        overflow: 'hidden', // To make sure the image doesn't spill outside the card
    },
    gradientBackground: {
        width: '100%',
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12, // More rounded corners for the gradient area
    },
    image: {
        width: 90, // Slightly larger image
        height: 90,
        borderRadius: 12,
    },
    name: {
        marginTop: 12,
        fontWeight: 'bold',
        fontSize: 18, // Larger font size for the name
        textAlign: 'center',
        color: '#fff', // White text for better contrast
        textShadowColor: 'rgba(0, 0, 0, 0.7)', // Adding text shadow for better readability
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    }
});
