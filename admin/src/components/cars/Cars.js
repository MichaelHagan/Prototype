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
  BooleanField,
  ImageInput,
  SelectInput,
  BooleanInput,
  maxLength,
  NumberField,
  NumberInput,
  FunctionField,
  ImageField,
  ReferenceInput
} from 'react-admin';
import { Link } from 'react-router-dom';
import { useMediaQuery } from "@mui/material";
const validateName = maxLength(30, "Maximum number of characters exceeded.(max:30 characters)");
const validateDescription = maxLength(120, "Maximum number of characters exceeded.(max:60 characters)");

export const CarList = () => {

  const handleViewImage = (url) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://' + url.replace(/\s/g, "");
    }
    window.open(url, '_blank');
  };

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
          <NumberField source="price" label="Price/day" />
          <ReferenceField label="Provider" source="BusinessId" reference="businesses">
            <TextField source="name" />
          </ReferenceField>
          <DateField source="createdAt" />
          <DateField source="updatedAt" />
          <FunctionField
            label="Image"
            render={(record) => (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewImage(record.imageUrl);
                }}
                style={{
                  backgroundColor: 'transparent',
                  color: '#1976D2',
                  border: '1px solid #1976D2',
                  borderRadius: '5px',
                  padding: '5px 10px',
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'lightblue';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                View
              </button>
            )}
          />
        </Datagrid>
      )}
    </List>
  )
};

export const CarEdit = () => (
  <Edit title={<CarTitle />}>
    <SimpleForm>
      <TextInput source="id" disabled style={{ width: '10%' }} />
      <TextInput source="name" validate={validateName} style={{ width: '40%' }} />
      <TextInput source="description" multiline rows={5} validate={validateDescription} style={{ width: '40%' }} />
      <BooleanInput source="available" />
      <NumberInput source="price" style={{ width: '20%' }} />
      <TextInput source="imageUrl" style={{ width: '100%' }} label="Current Image Url" disabled />
      <ImageInput source="imageUrl" label="Change Image">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);

export const CarCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={validateName} style={{ width: '40%' }} />
      <TextInput source="description" multiline rows={5} validate={validateDescription} style={{ width: '40%' }} />
      <BooleanInput source="available" />
      <NumberInput source="price" style={{ width: '20%' }} />
      <ImageInput source="imageUrl" label="Change Image">
        <ImageField source="src" title="title" />
      </ImageInput>
      <ReferenceInput label="Business" source="BusinessId" reference="businesses" perPage={100}>
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

const CarTitle = () => {
  const car = useRecordContext();
  return <span>{car ? `${car.name}` : ''}</span>;
};