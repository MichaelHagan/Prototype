import {
    Datagrid, 
    SimpleList,
    DateField, 
    List, 
    TextField,
    Edit,
    Create, 
    SimpleForm, 
    TextInput,
    useRecordContext,
    ReferenceField,
    SelectInput, 
    BooleanField,
    BooleanInput,
    maxLength,
    ReferenceInput
} from 'react-admin';

import { useMediaQuery } from "@mui/material";
const validateName = maxLength(30, "Maximum number of characters exceeded.(max:30 characters)");
const validateDescription = maxLength(120, "Maximum number of characters exceeded.(max:60 characters)");

export const BussinessList = () => {

  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.description}
          tertiaryText={(record) => record.available}
        />
      ) : (
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="description" />
            <BooleanField source="available" />
            <ReferenceField label="Location" source="LocationId" reference="locations">
                <TextField source="location" />
            </ReferenceField>
            <ReferenceField label="Owner" source="UserId" reference="jobOwners">
                <TextField source="name" />
            </ReferenceField>
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
        </Datagrid>
        )}
    </List>
    )
};

export const BussinessEdit = () => (
    <Edit title={<BussinessTitle />}>
        <SimpleForm>
        <TextInput source="id" disabled style={{ width: '10%' }}/>
        <TextInput source="name" validate={validateName} style={{ width: '40%' }}/>
        <TextInput source="description" multiline rows={5} validate={validateDescription} style={{ width: '40%' }}/>
        <BooleanInput source="available" />
        <ReferenceInput label="Location" source="LocationId" reference="locations" perPage={100}>
            <SelectInput optionText="location" />
        </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const BussinessCreate = () => (
    <Create>
        <SimpleForm>
        <TextInput source="name" validate={validateName} style={{ width: '40%' }}/>
        <TextInput source="description" multiline rows={5} validate={validateDescription} style={{ width: '40%' }}/>
        <BooleanInput source="available" />
        <ReferenceInput label="Location" source="LocationId" reference="locations" perPage={100}>
            <SelectInput optionText="location" />
        </ReferenceInput>
        <ReferenceInput label="Job Owner" source="jobOwnerId" reference="jobOwners" perPage={100}>
            <SelectInput optionText="name" />
        </ReferenceInput>
        </SimpleForm>
    </Create>
);

const BussinessTitle = () => {
    const bussiness = useRecordContext();
    return <span>{bussiness ? `${bussiness.name}` : ''}</span>;
  };