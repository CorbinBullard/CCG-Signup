import { Flex, Form, FormInstance, Splitter, Typography } from 'antd';
import CreateList from '../../components/formComponents/CreateList.js';
import { Field, FieldTypeEnum } from '../fields/field.type.js';
import FieldForm from '../fields/FieldForm.js';
import PreviewForm from '../forms/preview/PreviewForm.js';
import UniqueNameField from '../../components/formComponents/UniqueField.js';
import { useSavedForms } from './hooks/useSavedForms.js';

export default function SavedFormForm({
  form,
  preview = true,
}: {
  form: FormInstance;
  preview?: boolean;
}) {
  return (
    <>
      <Flex gap={16}>
        <UniqueNameField
          label={'Name'}
          name={'name'}
          getItemsQueryFn={useSavedForms}
        />
      </Flex>
      <Splitter>
        <Splitter.Panel min={500}>
          <CreateList
            name={'fields'}
            buttonLabel="Add Field"
            title={'Field'}
            card={true}
            initialValue={{
              label: '',
              type: FieldTypeEnum.Text,
              required: true,
            }}
            rules={[
              {
                validator: async (_: never, value: Field[]) => {
                  // 1. Minimum 1 field
                  if (!Array.isArray(value) || value.length < 1) {
                    throw new Error('You must add at least one field.');
                  }
                  // 2. At least one field is required
                  const hasRequired: boolean = value.some(
                    (field: Field) => field?.required,
                  );
                  if (!hasRequired) {
                    throw new Error(
                      'At least one field must be marked as required.',
                    );
                  }
                },
              },
            ]}
            required
            btnType={'link'}
          >
            <FieldForm mode={'edit'} />
          </CreateList>
        </Splitter.Panel>
        <Splitter.Panel collapsible>
          <Form.Item noStyle>
            {preview && <PreviewForm form={form} mode={'edit'} />}
          </Form.Item>
        </Splitter.Panel>
      </Splitter>
      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>
    </>
  );
}
