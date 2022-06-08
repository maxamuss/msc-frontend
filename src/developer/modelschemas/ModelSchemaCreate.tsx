import Header from '../components/Header';
import Form from '../components/Form';
import { IHeader, IForm } from '../components/types';
import TextField from '../components/Fields/TextField';
import { ROUTES } from '../utils/routing';

const headerProps: IHeader = {
    title: 'Model Detail',
}
const formProps: IForm = {
    action: '/modelschema/',
    method: 'POST',
    fields: [
        {
            fieldName: 'model_name',
            label: 'Model Name',
            widget: TextField,
        }
    ],
    navigate: { to: ROUTES.modelschema.detail, keys: ['id'] }
}

export default function ModelSchemaCreate() {
    return (
        <>
            <Header {...headerProps} />
            <Form {...formProps} />
        </>
    )
}