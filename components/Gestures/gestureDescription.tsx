import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    runOnJS
} from "react-native-reanimated";
import { Dimensions, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setShowDescription } from "@/redux/swapper/descriptionSlice";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MIN_HEIGHT = SCREEN_HEIGHT / 4;

export function GestureDescription() {
    const heightPercentage = useSharedValue(MIN_HEIGHT / SCREEN_HEIGHT);
    const context = useSharedValue({ y: 0 });
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [expandedState, setExpandedState] = useState<boolean>(false); // Local state for expansion

    const dispatch = useDispatch();

    const animatedStyles = useAnimatedStyle(() => {
        const opacity = interpolate(
            heightPercentage.value,
            [MIN_HEIGHT / SCREEN_HEIGHT, 0.5],
            [0.5, 1],
            Extrapolation.CLAMP
        );

        return {
            height: `${heightPercentage.value * 100}%`,
            opacity,
        };
    });

    useEffect(() => {
        dispatch(setShowDescription(expandedState));
    }, [expandedState, dispatch]);

    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: heightPercentage.value * SCREEN_HEIGHT };
        })
        .onUpdate((event) => {
            const newHeight = context.value.y - event.translationY;
            heightPercentage.value = Math.max(
                MIN_HEIGHT / SCREEN_HEIGHT,
                Math.min(0.5, newHeight / SCREEN_HEIGHT)
            );
        })
        .onEnd(() => {
            const expanded = heightPercentage.value > (MIN_HEIGHT / SCREEN_HEIGHT + 0.5) / 2;
            runOnJS(setExpandedState)(expanded); // Update local state
            heightPercentage.value = withSpring(expanded ? 0.5 : MIN_HEIGHT / SCREEN_HEIGHT, {
                damping: 50,
            });
        });

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View
                className={`absolute bottom-0 w-full bg-amber-50 border ${isExpanded ? 'border-blue-500' : 'border-gray-300'}`}
                style={animatedStyles}
            >
                <View className="self-center py-2">
                    <Entypo name={isExpanded ? "chevron-down" : "chevron-up"} size={24} color="black" />
                </View>
                {isExpanded && (
                    <View className="p-4">
                        <Text>Contenu supplémentaire quand étendu</Text>
                    </View>
                )}
            </Animated.View>
        </GestureDetector>
    );
}
