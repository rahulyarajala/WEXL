export const wrng=[
    'you may be wrong',
    'ohh just miss',
    'you didnt get it',
    'wronggggggg'
];

export const rght=[
    'you are right',
    'you have done it',
    'splendid',
    'correct'
];

export function right(){
    return (rght[Math.floor(Math.random() * rght.length)]);
}
export function wrong(){
    return (wrng[Math.floor(Math.random() * wrng.length)]);
}