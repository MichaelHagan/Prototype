import {
    Datagrid, 
    SimpleList,
    DateField, 
    EmailField, 
    List, 
    TextField,
    Edit,
    Create, 
    SimpleForm, 
    TextInput,
    PasswordInput,
    useRecordContext 
} from 'react-admin';


import { useMediaQuery } from "@mui/material";

export const JobOwnerList = () => {

  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.phone_number}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="phone_number" />
            <EmailField source="email" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
        </Datagrid>
        )}
    </List>
    )
};

export const JobOwnerEdit = () => (
    <Edit title={<JobOwnerTitle />}>
        <SimpleForm>
            <TextInput source="id" disabled/>
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="phone_number" />
            <PasswordInput source="password" />
        </SimpleForm>
    </Edit>
);

export const JobOwnerCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="phone_number" />
            <PasswordInput source="password" />
        </SimpleForm>
    </Create>
);

const JobOwnerTitle = () => {
    const jobOwner = useRecordContext();
    return <span>{jobOwner ? `${jobOwner.name}` : ''}</span>;
  };