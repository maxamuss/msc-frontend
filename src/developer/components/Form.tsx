import { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { sendSchemaData } from '../utils/api';
import Button from './Button';
import LoadingSpinner from './LoadingSpinner';
import { SchemaContext } from './SchemaObjectWrapper';
import { IForm } from './types';
import { generateSchemaPath } from '../utils/routing';
import InputField from './Fields/InputField';
import FloatField from './Fields/FloatField';
import CodeField from './Fields/CodeField';
import IconField from './Fields/IconField';

const fieldWidgets: any = {
    'input': InputField,
    'float': FloatField,
    'icon': IconField,
    'code': CodeField,
}

export default function Form(props: IForm) {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const schemaContext = useContext(SchemaContext);

    const { control, handleSubmit } = useForm();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formResult, setFormResult] = useState(null);
    const [error, setError] = useState(null);

    const onSubmit = (data: any) => {
        setIsSubmitting(true);

        const updatedSchema = {
            ...schemaContext.schema,
            ...data,
        }

        sendSchemaData({
            path: props.action,
            method: props.method,
            data: updatedSchema,
            setIsLoaded: setIsSubmitting,
            setResults: setFormResult,
            setError: setError,
            dispatch: dispatch,
        });
    }

    useEffect(() => {
        setIsSubmitting(false);
        if (formResult) {

            if (props.to) {
                navigate(generateSchemaPath(props.to, formResult));
            } else {
                schemaContext.setSchema(formResult);
            }
        }
    }, [formResult])

    return (
        <div className='bg-white overflow-hidden border-200 border-b p-4'>
            <form key='form' className='space-y-8 divide-y divide-y-blue-gray-200' onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-1 gap-y-6 md:grid-cols-2 xl:grid-cols-3 md:gap-x-6'>
                    {props.fields.map((fieldProps) => {
                        if (fieldWidgets[fieldProps.fieldType] !== 'undefined') {
                            const FieldWidget = fieldWidgets[fieldProps.fieldType];
                            const data = schemaContext.schema ?? {};

                            return <Controller
                                key={fieldProps.name}
                                name={fieldProps.name}
                                defaultValue={data[fieldProps.name]}
                                control={control}
                                render={({ field }) => <FieldWidget {...field} {...fieldProps} />}
                            />;
                        }
                    })}
                </div>
                <Button key='submitButton' type='submit'>
                    <>
                        {props.submitButtonText || 'Submit'}
                        {isSubmitting && <div className='ml-4'><LoadingSpinner /></div>}
                    </>
                </Button>
            </form>
        </div >
    )
}