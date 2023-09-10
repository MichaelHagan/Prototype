import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  EditButton,
  DeleteButton,
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  Create,
} from 'react-admin';

export const ImageList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="url" label="Image URL" />
      <BooleanField source="isMain" label="Main Image" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const ImageEdit = (props) => (
  <Edit title="Edit Image" {...props}>
    <SimpleForm>
      <TextInput source="url" label="Image URL" />
      <BooleanInput source="isMain" label="Main Image" />
    </SimpleForm>
  </Edit>
);

export const ImageCreate = (props) => (
  <Create title="Create Image" {...props}>
    <SimpleForm>
      <TextInput source="url" label="Image URL" />
      <BooleanInput source="isMain" label="Main Image" />
    </SimpleForm>
  </Create>
);
