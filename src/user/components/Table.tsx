import { useContext, useEffect, useState } from 'react';

import { ITable } from './types';
import { Link } from 'react-router-dom';
import { getModelObjects } from '../utils/api';
import { PageContext } from '../core/Page';
import { populateTo } from '../utils/routing';

export default function Table(props: ITable) {
    const pageContext = useContext(PageContext);

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [results, setResults] = useState([]);
    const [pagination, setPagination] = useState({ 'next': null, 'prev': null, 'count': null });

    const actions = props.actions ?? [];
    const fields = props?.fields ?? pageContext?.model?.definition.fields ?? [];

    useEffect(() => {
        getResults();
    }, [])

    const getResults = () => {
        setIsLoaded(false);
        const modelName = props.model_name ?? pageContext?.model?.model_name_lower() ?? '';
        getModelObjects(modelName, setResults, setPagination, setIsLoaded, setError);
    }

    return (
        <div className='overflow-x-auto'>
            <div className='inline-block min-w-full align-middle'>
                <div className='overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5 border-b'>
                    <table className='min-w-full divide-y divide-gray-300'>
                        <thead className='bg-gray-50'>
                            <tr>
                                {fields.map((field, idx) => (
                                    <th
                                        key={idx}
                                        scope='col'
                                        className={(idx === 0 ? 'pl-6 pr-3' : 'px-3 ') + 'py-3.5 text-left text-sm font-semibold text-gray-900 h-3'}
                                    >
                                        {field.field_name}
                                    </th>
                                ))}
                                {actions.length > 0 &&
                                    <th scope='col' className='relative py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 lg:pr-8'>
                                        Actions
                                    </th>
                                }
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200 bg-white'>
                            {error
                                ? <tr><td colSpan={fields.length}>Error</td></tr>
                                : !isLoaded
                                    ? <tr><td colSpan={fields.length}>Loading</td></tr>
                                    : results.map((result, rowIdx) => (
                                        <tr key={rowIdx}>
                                            {fields.map((field, colIdx) => (
                                                <td
                                                    key={colIdx}
                                                    className={(colIdx === 0 ? 'pl-6 pr-3' : 'px-3 ') + 'whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900'}
                                                // className='whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900'
                                                >
                                                    {result[field.field_name] ?? '-'}
                                                </td>
                                            ))}
                                            {actions.length > 0 &&
                                                <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8'>
                                                    {actions.map((action, idx) => {
                                                        if (action.to) {
                                                            return (
                                                                <Link
                                                                    key={idx}
                                                                    to={populateTo(action.to, pageContext.model, result)}
                                                                    className='text-indigo-600 hover:text-indigo-900'
                                                                >
                                                                    {action.icon && <action.icon className='-ml-1 mr-2 h-5 w-5 text-gray-500' />}
                                                                    {action.text}
                                                                </Link>
                                                            )
                                                        }
                                                    })}
                                                </td>
                                            }
                                        </tr>
                                    ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}
