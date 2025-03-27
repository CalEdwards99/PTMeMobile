import react, { createContext, useContext, useReducer } from 'react';
import { trainReducer, initialState } from './trainReducer.jsx';

const TrainContext = createContext();

export const TrainProvider = ({ children }) => {
    const [state, dispatch] = useReducer(trainReducer, initialState);

    return (
        <TrainContext.Provider value={{ state, dispatch}} >
            {children}
        </TrainContext.Provider>
    );
};

export const useTrainContext = () => {
    return useContext(TrainContext);
}