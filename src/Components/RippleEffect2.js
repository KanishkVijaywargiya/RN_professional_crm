import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
// const CircleColors = {
// c1: '#E1326D',
// c2: '#E1326D70',
// c3: '#E1326D30',
// c4: '#E1326D10',
// };
export default function RippleEffect2({
    c1 = '#E1326D',
    c2 = '#E1326D70',
    c3 = '#E1326D30',
    c4 = '#E1326D10',
}) {
    const c1Ref = useRef(new Animated.Value(0));
    const c2Ref = useRef(new Animated.Value(0));
    const c3Ref = useRef(new Animated.Value(0));
    const c4Ref = useRef(new Animated.Value(0));
    const expandAnimation = (circleRef, duration, toValue) =>
        Animated.timing(circleRef.current, {
            duration,
            toValue,
            useNativeDriver: true,
        });
    const scale = (circleRef, outputRange) =>
        circleRef.current.interpolate({
            inputRange: [0, 1],
            outputRange,
        });
    const animateForward = () =>
        Animated.parallel([
            expandAnimation(c1Ref, 300, 1),
            expandAnimation(c2Ref, 600, 1),
            expandAnimation(c3Ref, 900, 1),
            expandAnimation(c4Ref, 1200, 1),
        ]).start(() => {
            Animated.parallel([
                expandAnimation(c1Ref, 300, 0),
                expandAnimation(c2Ref, 600, 0),
                expandAnimation(c3Ref, 900, 0),
                expandAnimation(c4Ref, 1200, 0),
            ]).start(() => animateForward());
        });
    useEffect(() => {
        animateForward();
    }, []);
    return (
        <View style={styles.root}>
            <Animated.View
                style={[
                    styles.absolute,
                    styles.circle4, { backgroundColor: c4 },
                    {
                        transform: [
                            { scaleX: scale(c4Ref, [1, 4]) },
                            { scaleY: scale(c4Ref, [1, 4]) },
                        ],
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.absolute,
                    styles.circle3, { backgroundColor: c3 },
                    {
                        transform: [
                            { scaleX: scale(c3Ref, [1, 3]) },
                            { scaleY: scale(c3Ref, [1, 3]) },
                        ],
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.absolute,
                    styles.circle2, { backgroundColor: c2 },
                    {
                        transform: [
                            { scaleX: scale(c2Ref, [1, 2]) },
                            { scaleY: scale(c2Ref, [1, 2]) },
                        ],
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.absolute,
                    styles.circle1, { backgroundColor: c1 },
                    {
                        transform: [
                            { scaleX: scale(c1Ref, [1, 1]) },
                            { scaleY: scale(c1Ref, [1, 1]) },
                        ],
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: 250,
        height: 250,
    },
    circle1: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    circle2: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    circle3: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    circle4: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    absolute: {
        position: 'absolute',
        alignSelf: 'center',
    },
});