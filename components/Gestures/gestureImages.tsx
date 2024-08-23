import {
    Extrapolation,
    interpolate,
    runOnJS,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from "react-native-reanimated";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import {Dimensions, Image, Pressable, SafeAreaView, ScrollView, Text, View} from "react-native";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {AntDesign, Ionicons} from "@expo/vector-icons";

const cards = [
    'https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg',
]

export function GestureImages() {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const translateImage = useSharedValue(0);
    const translateSuperLikeDescription = useSharedValue(0);
    const [like, setLike] = useState(false);
    const [nope, setNope] = useState(false);
    const [superLike, setSuperLike] = useState(false);
    const descriptionSlice = useSelector((state: RootState) => state.description)
    const dispatch = useDispatch()


    const handleTap = (x: number, y: number) => {
        const {width, height} = Dimensions.get('window');
        const halfwidth = width / 2;
        const fourthheight = height / 3;
        if (y < (height - fourthheight)) {
            if (x < halfwidth) {
                changeCard(-1);
            } else {
                changeCard(1);
            }
        }

    }

    const handleDismiss = (direction: any) => {
        console.log(direction);
        switch (direction) {
            case 'LIKE' :

        }
        setTimeout(() => {
            translateImage.value = withSpring(0);

        }, 500);
    }

    const changeCard = (direction: number) => {
        setCurrentCardIndex((prevIndex) => {
            if (direction === 1) {
                return (prevIndex + 1) % cards.length;
            } else {
                return prevIndex === 0 ? 0 : (prevIndex - 1 + cards.length) % cards.length;
            }
        });
    };

    // const gestureDragImage = Gesture.Pan().activeOffsetX([-10, 10]).onUpdate((e) => {
    //     translateImage.value = e.translationX;
    //     translateSuperLikeDescription.value = e.translationY;
    //
    //
    // }).onEnd(() => {
    //     const shouldDismiss = Math.abs(translateImage.value) > 100;
    //     const shouldSuperLike = translateSuperLikeDescription.value > 100;
    //     const shouldDescription = translateSuperLikeDescription.value < -100;
    //     if (shouldSuperLike) {
    //         console.log("superLike")
    //     }
    //     if (shouldDescription) {
    //         console.log("Description")
    //
    //     }
    //     if (shouldDismiss) {
    //         runOnJS(handleDismiss)(translateImage.value > 0 ? 'LIKE' : 'NOPE');
    //     } else {
    //         translateImage.value = withSpring(0);
    //
    //     }
    // });

    const gestureTapImage = Gesture.Tap().onEnd((e) => {

        runOnJS(handleTap)(e.x, e.y)
    })


    // const animatedStyles = useAnimatedStyle(() => {
    //     const rotate = interpolate(
    //         translateImage.value,
    //         [-200, 0, 200],
    //         [-15, 0, 15],
    //         Extrapolation.CLAMP
    //     );
    //     return {
    //         transform: [
    //             {translateX: translateImage.value},
    //             {translateY: translateSuperLikeDescription.value},
    //             {rotate: `${rotate}deg`},
    //         ],
    //     };
    // });
    // const buttonContainerStyle = useAnimatedStyle(() => {
    //     const rotate = interpolate(
    //         translateImage.value,
    //         [-200, 0, 200],
    //         [30, 0, -30],
    //         Extrapolation.CLAMP
    //     );
    //     return {
    //         transform: [
    //             {translateX: translateImage.value},
    //             {translateY: 0},
    //             {rotate: `${rotate}deg`},
    //         ],
    //     };
    // });
    // const likeStyle = useAnimatedStyle(() => {
    //     const opacity = interpolate(
    //         translateImage.value,
    //         [30, 70],
    //         [0, 1],
    //         Extrapolation.CLAMP
    //     );
    //     return {opacity};
    // });
    // const nopeStyle = useAnimatedStyle(() => {
    //
    //     const opacity = interpolate(
    //         translateImage.value,
    //         [-70, -30],
    //         [1, 0],
    //         Extrapolation.CLAMP
    //     );
    //     return {opacity};
    // });
    // const superLikeStyle = useAnimatedStyle(() => {
    //
    //     const opacity = interpolate(
    //         translateSuperLikeDescription.value,
    //         [70, 30],
    //         [1, 0],
    //         Extrapolation.CLAMP
    //     );
    //     return {opacity};
    // });


    // const scrollY = useSharedValue(0);
    // // const composed = Gesture.Exclusive(
    // //     Gesture.Race(gestureDragImage, gestureTapImage)
    // // );
    // const scrollViewStyle = useAnimatedStyle(() => {
    //     return {
    //         transform: [{translateY: scrollY.value}],
    //     };
    // });

    const offSetY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            offSetY.value = event.contentOffset.y;
        },
        onMomentumBegin: (e) => {
            console.log('The list is moving.');
        },
        onMomentumEnd: (e) => {
            console.log('The list stopped moving.');
        },
    });

    return (

        <SafeAreaView className={"w-full h-full"}>

            <GestureDetector gesture={gestureTapImage}>
                <ScrollView className={"absolute top-0 bottom-0  w-full"}>
                    <Image
                        source={{uri: cards[currentCardIndex]}}
                        style={{width: '100%', height: 500}}
                        resizeMode="cover"
                    />
                    <Text>testr</Text>
                    <Image
                        source={{uri: cards[currentCardIndex]}}
                        style={{width: '100%', height: 500}}
                        resizeMode="cover"
                    />
                </ScrollView>
            </GestureDetector>


            <View className="absolute top-0 w-full py-2 flex-row  justify-between ">

                    {cards.map((_, index) => {
                        return (
                            <View
                                key={index}
                                style={{ width: `${100 / (cards.length)}%` }}
                                className={`h-2  rounded-2xl ${
                                    index === currentCardIndex ? 'bg-white' : 'bg-gray-400'
                                }`}
                            />
                        )
                    })}

            </View>


            <View className="absolute bottom-0 left-0 right-0 h-1/4 flex-row justify-evenly items-center pb-5">
                <View>
                    <Pressable

                        className="w-14 h-14 rounded-full bg-white justify-center items-center shadow-md"
                        onPress={() => console.log("Retour")}
                    >
                        <Ionicons name="arrow-undo" size={30} color={"#f0ad4e"}/>
                    </Pressable>
                </View>
                <View>
                    <Pressable
                        className="w-14 h-14 rounded-full bg-white justify-center items-center shadow-md"
                        onPress={() => console.log("Non")}
                    >
                        <AntDesign name="close" size={30} color={"#dc3545"}/>
                    </Pressable>
                </View>

                <View>
                    <Pressable
                        className="w-12 h-12 rounded-full bg-white justify-center items-center shadow-md "
                        onPress={() => console.log("Super Like")}
                    >
                        <AntDesign name="star" size={30} color={"#007bff"}/>
                    </Pressable>
                </View>

                <View>
                    <Pressable
                        className="w-14 h-14 rounded-full bg-white justify-center items-center shadow-md"
                        onPress={() => console.log("Like")}
                    >
                        <AntDesign name="heart" size={30} color={"#28a745"}/>
                    </Pressable>
                </View>

                <View>
                    <Pressable
                        className="w-14 h-14 rounded-full bg-white justify-center items-center shadow-md"
                        onPress={() => console.log("Boost")}
                    >
                        <Ionicons name="flash" size={30} color={"#17a2b8"}/>
                    </Pressable>
                </View>


            </View>


            {/*        <GestureDetector gesture={composed}>*/}
            {/*            <Animated.View style={[{flex: 1}]}>*/}
            {/*            <Animated.View*/}
            {/*            className="absolute top-0 self-end h-full justify-center w-full"*/}
            {/*            style={likeStyle}*/}
            {/*        >*/}
            {/*            <LinearGradient colors={['rgb(162,248,164)', 'transparent']} start={{x: 1, y: 0}}*/}
            {/*                            end={{x: 0, y: 0}} className={"h-full w-full justify-center items-center"}>*/}

            {/*            </LinearGradient>*/}
            {/*            <View className="absolute left-0 top-0 rotate-12 p-20 bg-white">*/}
            {/*                <AntDesign name="like2" size={60} color={'rgb(0,255,8)'}/>*/}
            {/*            </View>*/}
            {/*        </Animated.View>*/}
            {/*        <Animated.View*/}
            {/*            className="absolute top-0 self-start h-full w-full "*/}
            {/*            style={nopeStyle}*/}
            {/*        >*/}
            {/*            <LinearGradient colors={['rgba(255,2,2,0.8)', 'transparent']} start={{x: 0, y: 0}}*/}
            {/*                            end={{x: 1, y: 0}} className={"h-full w-1/2"}>*/}
            {/*            </LinearGradient>*/}
            {/*            <View className={"absolute right-0 top-0 -rotate-12 p-20 bg-white"}>*/}
            {/*                <AntDesign name="dislike2" size={60} color={'rgb(255,0,0)'}/>*/}
            {/*            </View>*/}
            {/*        </Animated.View>*/}


            {/*        <Animated.View className="absolute top-0 self-center h-1/2 w-full justify-center"*/}
            {/*                       style={superLikeStyle}>*/}

            {/*            <View className="self-center p-20 rounded-full">*/}
            {/*                <FontAwesome5 name="fire-alt" size={80} color="#007bff"/>*/}
            {/*            </View>*/}
            {/*        </Animated.View>*/}


            {/*    </Animated.View>*/}
            {/*</GestureDetector>*/}

        </SafeAreaView>

    );
}

{/*
           */
}