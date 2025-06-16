import avatarLocal from '../img/CallumEdwards.jpg';

const sessionRatingMap = {
    1: 'dizzy',
    2: 'frown',
    3: 'meh',
    4: 'grin',
    5: 'grin-hearts'
};

export const initialState = {
    loading: false,

    workoutName: '',
    workoutDescription: '',

    workoutsList: []
};

export const workoutFeedReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return { ...state, loading: true };

        case 'GETWORKOUTS_SUCCESS':
            const transformed = action.payload.map(session => ({
                id: session.workoutSessionId.toString(),
                user: {
                    name: 'Callum Edwards', // can be dynamic later
                    avatar: avatarLocal,
                },
                timestamp: new Date(session.completionDate).toLocaleDateString(),
                workoutRank: sessionRatingMap[session.sessionRatingId] || 'meh',
                description: session.sessionNotes,
                image: null,
                exercises: [] // populate later when available
            }));

            return {
                ...state,
                loading: false,
                workoutsList: transformed
            };

        // other cases...

        default:
            return state;
    }
};