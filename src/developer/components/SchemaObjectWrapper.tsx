import { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getSchemaData } from '../utils/api';
import { inject } from '../utils/render';
import LoadingSpinner from './LoadingSpinner';
import { ISchemaObjectWrapper } from './types';

export const SchemaContext = createContext({ schema: null });

export default function SchemaObjectWrapper(props: ISchemaObjectWrapper) {
    let params = useParams();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [schema, setSchema] = useState(null);

    const context = {
        schema: schema
    };

    useEffect(() => {
        getSchemaData({
            path: inject(props.path, params),
            setResults: setSchema,
            setIsLoaded: setIsLoaded,
            setError: setError,
            fields: props.fields,
        });
    }, [])

    if (error) {
        return <div>error</div>;
    } else if (!isLoaded) {
        return <LoadingSpinner />;
    } else {
        return (
            <SchemaContext.Provider value={context}>
                {props.children}
            </SchemaContext.Provider>
        );
    }
} 