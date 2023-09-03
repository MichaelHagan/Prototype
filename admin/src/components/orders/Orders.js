import {
    Datagrid,
    SimpleList,
    DateField,
    List,
    NumberField,
    TextField,
    Edit,
    SaveButton,
    Toolbar,
    Create,
    NumberInput,
    SimpleForm,
    TextInput,
    useRecordContext,
    ReferenceField,
    SelectInput,
    BooleanInput,
    BooleanField,
    DateTimeInput,
    ReferenceInput,
    Filter
} from 'react-admin';

import { useMediaQuery } from "@mui/material";



export const OrderList = () => {

    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    return (
        <List
        filters ={<OrderFilter />}
        >
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.customer_name}
                    secondaryText={(record) => record.customer_number}
                    tertiaryText={(record) => record.total_price}
                />
            ) :
                (
                    <Datagrid rowClick="edit">
                        <TextField source="id" />
                        <TextField source="details" />
                        <TextField source="customer_name" />
                        <TextField source="customer_number" />
                        <NumberField source="total_price" />
                        <TextField source="order_state" />
                        <BooleanField source="payment" />
                        <ReferenceField label="Car" source="CarId" reference="cars">
                            <TextField source="name" />
                        </ReferenceField>
                        <DateField source="pickup_time" />
                        <DateField source="dropoff_time" />
                        <DateField source="createdAt" />
                        <DateField source="updatedAt" />
                    </Datagrid>
                )}
        </List>
    )
};

export const OrderEdit = () => (
    <Edit title={<OrderTitle />}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="details" multiline rows={5} />
            <TextInput source="customer_name" />
            <TextInput source="customer_number" />
            <NumberInput source="total_price" />
            <SelectInput source="order_state" choices={[
                { id: 'New', name: 'New' },
                { id: 'Pending', name: 'Pending' },
                { id: 'Approved', name: 'Approved' },
            ]}
            />
            <BooleanInput source="payment" />
            <DateTimeInput
                label="Pickup Time"
                source="pickup_time"
            />
            <DateTimeInput
                label="Drop-off Time"
                source="dropoff_time"
            />
        </SimpleForm>
    </Edit>
);


export const OrderCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="details" multiline rows={5} />
            <TextInput source="customer_name" />
            <TextInput source="customer_number" />
            <NumberInput source="total_price" />
            <SelectInput source="order_state" choices={[
                { id: 'New', name: 'New' },
                { id: 'Pending', name: 'Pending' },
                { id: 'Approved', name: 'Approved' },
            ]}
            />
            <BooleanInput source="payment" />
            <DateTimeInput
                label="Pickup Time"
                source="pickup_time"
            />
            <DateTimeInput
                label="Drop-off Time"
                source="dropoff_time"
            />
            <ReferenceInput label="User" source="UserId" reference="users" perPage={100}>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput label="Car" source="CarId" reference="cars" perPage={100}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

const OrderTitle = () => {
    const order = useRecordContext();
    return <span>{order ? `${order.customer_name}` : ''}</span>;
};

const OrderFilter = (props) => (
    <Filter {...props}>
      <TextInput label="Search by ID" source="id" alwaysOn />
    </Filter>
  );