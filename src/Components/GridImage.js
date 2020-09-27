import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

const GridImage = ({ image, width, bgColor, text, border, para, pushTo }) => {
    return (
        <View style={{
            backgroundColor: '#000',
            width: width,
            height: width,
            marginVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 10,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.3,
            shadowRadius: 2
        }}>
            <Image source={image} style={{ height: 50, width: 50 }} />
            <Text style={{ color: '#000', fontWeight: 'bold', marginTop: 5 }}> {text}</Text>
            <Text style={{ color: '#B8BECE', fontWeight: '400', marginTop: 5 }}> {para}</Text>
        </View>
    )
}
export default GridImage;