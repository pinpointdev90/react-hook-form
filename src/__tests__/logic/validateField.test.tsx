import getCheckboxValue from '../../logic/getCheckboxValue';
import getRadioValue from '../../logic/getRadioValue';
import validateField from '../../logic/validateField';

jest.mock('../../logic/getRadioValue');
jest.mock('../../logic/getCheckboxValue');

describe('validateField', () => {
  it('should return required true when input not filled with required', async () => {
    (getRadioValue as jest.Mock<any>).mockImplementation(() => ({
      value: '2',
    }));
    (getCheckboxValue as jest.Mock<any>).mockImplementation(() => ({
      value: false,
      isValid: false,
    }));

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'text', value: '', name: 'test' },
            required: true,
          },
        },
        '',
        false,
      ),
    ).toEqual({
      test: {
        ref: { type: 'text', value: '', name: 'test' },
        message: '',
        type: 'required',
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'text', value: '', name: 'test' },
            required: 'required',
          },
        },
        '',
        false,
      ),
    ).toEqual({
      test: {
        ref: { type: 'text', value: '', name: 'test' },
        message: 'required',
        type: 'required',
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'text', value: '', name: 'test' },
            required: 'required',
          },
        },
        '',
        false,
      ),
    ).toEqual({
      test: {
        ref: { type: 'text', value: '', name: 'test' },
        message: 'required',
        type: 'required',
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'text', value: '', name: 'test' },
            required: {
              value: true,
              message: 'required',
            },
          },
        },
        '',
        false,
      ),
    ).toEqual({
      test: {
        ref: { type: 'text', value: '', name: 'test' },
        message: 'required',
        type: 'required',
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'text', value: '', name: 'test' },
            required: {
              value: true,
              message: 'required',
            },
          },
        },
        '',
        false,
      ),
    ).toEqual({
      test: {
        ref: { type: 'text', value: '', name: 'test' },
        message: 'required',
        type: 'required',
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'text', value: '', name: 'test' },
            required: {
              value: false,
              message: 'required',
            },
          },
        },
        '',
        false,
      ),
    ).toEqual({});

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'radio', name: 'test' },
            required: true,
          },
        },
        false,
        false,
      ),
    ).toEqual({
      test: {
        message: '',
        type: 'required',
        ref: { type: 'radio', name: 'test' },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'text', value: '', name: 'test' },
            required: 'test',
          },
        },
        '',
        false,
      ),
    ).toEqual({
      test: {
        message: 'test',
        type: 'required',
        ref: { type: 'text', name: 'test', value: '' },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'radio', value: '', name: 'test' },
            required: 'test',
          },
        },
        '',
        false,
      ),
    ).toEqual({
      test: {
        message: 'test',
        type: 'required',
        ref: { type: 'radio', name: 'test', value: '' },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'checkbox', name: 'test' },
            required: 'test',
          },
        },
        false,
        false,
      ),
    ).toEqual({
      test: {
        message: 'test',
        type: 'required',
        ref: { type: 'checkbox', name: 'test' },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'text', value: '0', name: 'test' },
            required: true,
            value: '0',
          },
        },
        '0',
        false,
      ),
    ).toEqual({});

    (getCheckboxValue as jest.Mock<any>).mockImplementation(() => ({
      value: 'test',
      isValid: true,
    }));

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'checkbox', name: 'test' },
            required: 'test',
          },
        },
        '',
        false,
      ),
    ).toEqual({});

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            valueAsNumber: true,
            ref: { name: 'test', value: '' },
            required: true,
            value: NaN,
          },
        },
        '',
        false,
      ),
    ).toEqual({
      test: {
        type: 'required',
        message: '',
        ref: {
          name: 'test',
          value: '',
        },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { name: 'test', type: 'file', value: '' },
            required: true,
            value: {},
          },
        },
        '',
        false,
      ),
    ).toEqual({
      test: {
        type: 'required',
        message: '',
        ref: {
          type: 'file',
          name: 'test',
          value: '',
        },
      },
    });
  });

  it('should return max error', async () => {
    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'number', name: 'test', valueAsNumber: 10 },
            value: 10,
            required: true,
            max: 0,
          },
        },
        10,
        false,
      ),
    ).toEqual({
      test: {
        type: 'max',
        message: '',
        ref: { type: 'number', name: 'test', valueAsNumber: 10 },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'number', name: 'test', valueAsNumber: 10 },
            value: 10,
            required: true,
            max: {
              value: 0,
              message: 'max',
            },
          },
        },
        10,
        false,
      ),
    ).toEqual({
      test: {
        type: 'max',
        message: 'max',
        ref: { type: 'number', name: 'test', valueAsNumber: 10 },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'number', name: 'test', valueAsNumber: 10 },
            required: true,
            max: {
              value: 0,
              message: 'max',
            },
            value: 10,
          },
        },
        10,
        false,
      ),
    ).toEqual({
      test: {
        type: 'max',
        message: 'max',
        ref: { type: 'number', name: 'test', valueAsNumber: 10 },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'number', name: 'test', valueAsNumber: 8 },
            value: 8,
            required: true,
            max: 8,
          },
        },
        8,
        false,
      ),
    ).toEqual({});

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'number', name: 'test', valueAsNumber: 10 },
            value: 10,
            max: 8,
          },
        },
        10,
        true,
      ),
    ).toEqual({
      test: {
        type: 'max',
        message: '',
        ref: { type: 'number', name: 'test', valueAsNumber: 10 },
        types: {
          max: true,
        },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'custom', name: 'test', valueAsNumber: NaN },
            value: '',
            required: true,
          },
        },
        '',
        false,
      ),
    ).toEqual({
      test: {
        type: 'required',
        message: '',
        ref: { type: 'custom', name: 'test', valueAsNumber: NaN },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'custom',
              name: 'test',
              valueAsNumber: NaN,
            },
            value: undefined,
            required: true,
          },
        },
        undefined,
        false,
      ),
    ).toEqual({
      test: {
        type: 'required',
        message: '',
        ref: {
          type: 'custom',
          name: 'test',
          value: undefined,
          valueAsNumber: NaN,
        },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'custom',
              name: 'test',
              valueAsNumber: NaN,
            },
            value: null,
            required: true,
          },
        },
        null,
        false,
      ),
    ).toEqual({
      test: {
        type: 'required',
        message: '',
        ref: { type: 'custom', name: 'test', valueAsNumber: NaN },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'custom', name: 'test' },
            required: true,
            value: 'ok',
          },
        },
        'ok',
        false,
      ),
    ).toEqual({});

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'date',
              name: 'test',
            },
            value: '2019-2-13',
            required: true,
            max: '2019-1-12',
          },
        },
        '2019-2-13',
        false,
      ),
    ).toEqual({
      test: {
        type: 'max',
        message: '',
        ref: {
          type: 'date',
          name: 'test',
        },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'week',
              name: 'test',
            },
            value: '2022-W18',
            required: true,
            max: {
              value: '2022-W17',
              message: 'max',
            },
          },
        },
        '2022-W18',
        false,
      ),
    ).toEqual({
      test: {
        type: 'max',
        message: 'max',
        ref: {
          type: 'week',
          name: 'test',
        },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'time',
              name: 'test',
            },
            value: '14:00',
            required: true,
            max: {
              value: '13:00',
              message: 'max',
            },
          },
        },
        '14:00',
        false,
      ),
    ).toEqual({
      test: {
        type: 'max',
        message: 'max',
        ref: {
          type: 'time',
          name: 'test',
        },
      },
    });
  });

  it('should return min error', async () => {
    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'number', name: 'test', valueAsNumber: -1 },
            value: -1,
            required: true,
            min: 0,
          },
        },
        -1,
        false,
      ),
    ).toEqual({
      test: {
        type: 'min',
        message: '',
        ref: { type: 'number', name: 'test', valueAsNumber: -1 },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'number', name: 'test', valueAsNumber: -1 },
            value: -1,
            required: true,
            min: {
              value: 0,
              message: 'min',
            },
          },
        },
        -1,
        false,
      ),
    ).toEqual({
      test: {
        type: 'min',
        message: 'min',
        ref: { type: 'number', name: 'test', valueAsNumber: -1 },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'number', name: 'test', valueAsNumber: -1 },
            value: -1,
            required: true,
            min: {
              value: 0,
              message: 'min',
            },
          },
        },
        -1,
        false,
      ),
    ).toEqual({
      test: {
        type: 'min',
        message: 'min',
        ref: { type: 'number', name: 'test', valueAsNumber: -1 },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'number', name: 'test', valueAsNumber: 10 },
            value: 10,
            required: true,
            min: 12,
          },
        },
        10,
        false,
      ),
    ).toEqual({
      test: {
        type: 'min',
        message: '',
        ref: { type: 'number', name: 'test', valueAsNumber: 10 },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'date',
              name: 'test',
              valueAsDate: new Date('2019-2-12'),
            },
            value: '2019-2-12',
            required: true,
            min: '2019-3-12',
          },
        },
        '2019-2-12',
        false,
      ),
    ).toEqual({
      test: {
        type: 'min',
        message: '',
        ref: {
          type: 'date',
          name: 'test',
          valueAsDate: new Date('2019-2-12'),
        },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'date',
              name: 'test',
            },
            value: '2019-2-12',
            required: true,
            min: {
              value: '2019-3-12',
              message: 'min',
            },
          },
        },
        '2019-2-12',
        false,
      ),
    ).toEqual({
      test: {
        type: 'min',
        message: 'min',
        ref: {
          type: 'date',
          name: 'test',
        },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'date',
              name: 'test',
              valueAsDate: new Date('2019-2-12'),
            },
            value: '2019-2-12',
            required: true,
            min: {
              value: '2019-3-12',
              message: 'min',
            },
          },
        },
        '2019-2-12',
        false,
      ),
    ).toEqual({
      test: {
        type: 'min',
        message: 'min',
        ref: {
          type: 'date',
          name: 'test',
          valueAsDate: new Date('2019-2-12'),
        },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'week',
              name: 'test',
            },
            value: '2022-W15',
            required: true,
            min: {
              value: '2022-W17',
              message: 'min',
            },
          },
        },
        '2022-W15',
        false,
      ),
    ).toEqual({
      test: {
        type: 'min',
        message: 'min',
        ref: {
          type: 'week',
          name: 'test',
        },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'time',
              name: 'test',
            },
            value: '12:00',
            required: true,
            min: {
              value: '13:00',
              message: 'min',
            },
          },
        },
        '12:00',
        false,
      ),
    ).toEqual({
      test: {
        type: 'min',
        message: 'min',
        ref: {
          type: 'time',
          name: 'test',
        },
      },
    });
  });

  it('should return min and max error for custom input', async () => {
    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: '', name: 'test' },
            value: '1',
            required: true,
            min: '4',
          },
        },
        '1',
        false,
      ),
    ).toEqual({
      test: {
        type: 'min',
        message: '',
        ref: { type: '', name: 'test' },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: '', name: 'test' },
            value: '4',
            required: true,
            max: '2',
          },
        },
        '4',
        false,
      ),
    ).toEqual({
      test: {
        type: 'max',
        message: '',
        ref: { type: '', name: 'test' },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: '',
              name: 'test',
              valueAsDate: new Date('2019-2-12'),
            },
            value: '2019-2-12',
            required: true,
            max: '2019-1-12',
          },
        },
        '2019-2-12',
        false,
      ),
    ).toEqual({
      test: {
        type: 'max',
        message: '',
        ref: {
          type: '',
          name: 'test',
          valueAsDate: new Date('2019-2-12'),
        },
      },
    });
  });

  it('should return max length error ', async () => {
    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'text',
              name: 'test',
            },
            value: 'This is a long text input',
            required: true,
            maxLength: 12,
          },
        },
        'This is a long text input',
        false,
      ),
    ).toEqual({
      test: {
        ref: {
          type: 'text',
          name: 'test',
        },
        message: '',
        type: 'maxLength',
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'text',
              name: 'test',
            },
            value: 'This is a long text input',
            required: true,
            maxLength: {
              value: 12,
              message: 'maxLength',
            },
          },
        },
        'This is a long text input',
        false,
      ),
    ).toEqual({
      test: {
        ref: {
          type: 'text',
          name: 'test',
        },
        message: 'maxLength',
        type: 'maxLength',
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'text',
              name: 'test',
            },
            value: 'This is a long text input',
            required: true,
            maxLength: {
              value: 12,
              message: 'maxLength',
            },
          },
        },
        'This is a long text input',
        false,
      ),
    ).toEqual({
      test: {
        ref: {
          type: 'text',
          name: 'test',
        },
        message: 'maxLength',
        type: 'maxLength',
      },
    });
  });

  it('should return min length error ', async () => {
    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'text',
              name: 'test',
            },
            value: 'This is a long text input',
            required: true,
            minLength: 200,
          },
        },
        'This is a long text input',
        false,
      ),
    ).toEqual({
      test: {
        ref: {
          type: 'text',
          name: 'test',
        },
        message: '',
        type: 'minLength',
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'text',
              name: 'test',
            },
            value: 'This is a long text input',
            required: true,
            minLength: {
              value: 200,
              message: 'minLength',
            },
          },
        },
        'This is a long text input',
        false,
      ),
    ).toEqual({
      test: {
        ref: {
          type: 'text',
          name: 'test',
        },
        message: 'minLength',
        type: 'minLength',
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'text',
              name: 'test',
            },
            value: 'This is a long text input',
            required: true,
            minLength: {
              value: 200,
              message: 'minLength',
            },
          },
        },
        'This is a long text input',
        false,
      ),
    ).toEqual({
      test: {
        ref: {
          type: 'text',
          name: 'test',
        },
        message: 'minLength',
        type: 'minLength',
      },
    });
  });

  it('should return pattern error when not matching', async () => {
    const emailRegex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'text',
              name: 'test',
            },
            value: 'This is a long text input',
            required: true,
            pattern: emailRegex,
          },
        },
        'This is a long text input',
        false,
      ),
    ).toEqual({
      test: {
        ref: {
          type: 'text',
          name: 'test',
        },
        message: '',
        type: 'pattern',
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'text',
              name: 'test',
            },
            required: true,
            value: 'This is a long text input',
            pattern: {
              value: emailRegex,
              message: 'regex failed',
            },
          },
        },
        'This is a long text input',
        false,
      ),
    ).toEqual({
      test: {
        ref: {
          type: 'text',
          name: 'test',
        },
        message: 'regex failed',
        type: 'pattern',
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'text',
              name: 'test',
            },
            value: 'This is a long text input',
            required: true,
            pattern: {
              value: emailRegex,
              message: 'regex failed',
            },
          },
        },
        'This is a long text input',
        false,
      ),
    ).toEqual({
      test: {
        ref: {
          type: 'text',
          name: 'test',
        },
        message: 'regex failed',
        type: 'pattern',
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'text',
              name: 'test',
            },
            value: 'test@test.com',
            required: true,
            pattern: emailRegex,
          },
        },
        'test@test.com',
        false,
      ),
    ).toEqual({});

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'text',
              name: 'test',
            },
            value: null,
            required: false,
            pattern: emailRegex,
          },
        },
        null,
        false,
      ),
    ).toEqual({});
  });

  it('should validate for custom validation', async () => {
    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'text',
              name: 'test',
            },
            value: 'This is a long text input',
            required: true,
            validate: (value) => value.toString().length > 3,
          },
        },
        'This is a long text input',
        false,
      ),
    ).toEqual({});

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'text',
              name: 'test',
            },
            value: 'This is a long text input',
            required: true,
            validate: (value) => value.toString().length < 3,
          },
        },
        'This is a long text input',
        false,
      ),
    ).toEqual({
      test: {
        message: '',
        ref: {
          type: 'text',
          name: 'test',
        },
        type: 'validate',
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'text',
              name: 'test',
            },
            value: 'This is a long text input',
            required: true,
            validate: {
              test: (value) => value.toString().length < 3,
              test1: (value) => value.toString().length > 10,
            },
          },
        },
        'This is a long text input',
        false,
      ),
    ).toEqual({
      test: {
        ref: {
          type: 'text',
          name: 'test',
        },
        type: 'test',
        message: '',
      },
    });

    (getRadioValue as jest.Mock<any>).mockImplementation(() => {
      return {
        isValid: false,
        value: 'test',
      };
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'text',
              name: 'test',
            },
            value: 'This is a long text input!',
            validate: {
              test: (value) => value.toString().length < 3,
              test1: (value) => value.toString().length > 10,
            },
          },
        },
        'This is a long text input!',
        false,
      ),
    ).toEqual({
      test: {
        ref: {
          name: 'test',
          type: 'text',
        },
        type: 'test',
        message: '',
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'radio',
              name: 'test',
            },
            value: 'This is a long text input!',
            validate: {
              test: (value) => value.toString().length < 3,
              test1: (value) => value.toString().length > 10,
            },
            refs: [{ type: 'data' } as HTMLInputElement],
          },
        },
        'This is a long text input!',
        false,
      ),
    ).toEqual({
      test: {
        ref: { type: 'data' },
        type: 'test',
        message: '',
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'radio',
              name: 'test',
            },
            value: 'This is a long text input!',
            validate: {
              test: () => true,
            },
            refs: [
              {
                type: 'data',
              } as HTMLInputElement,
            ],
          },
        },
        'This is a long text input!',
        false,
      ),
    ).toEqual({});
  });

  it('should return error message when it is defined', async () => {
    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'text',
              name: 'test',
            },
            value: 'This is a long text input',
            validate: {
              test: (value) => {
                if (value.toString().length > 3) {
                  return 'max 3';
                }
                return true;
              },
            },
          },
        },
        'This is a long text input',
        false,
      ),
    ).toEqual({
      test: {
        type: 'test',
        message: 'max 3',
        ref: {
          type: 'text',
          name: 'test',
        },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'text',
              name: 'test',
            },
            value: 'This is a long text input',
            validate: {
              test: (value) => {
                if (value.toString().length > 3) {
                  return 'max 3';
                }
                return true;
              },
            },
          },
        },
        'This is a long text input',
        false,
      ),
    ).toEqual({
      test: {
        type: 'test',
        message: 'max 3',
        ref: {
          type: 'text',
          name: 'test',
        },
      },
    });
  });

  it('should return result or empty string when validate has error', async () => {
    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'text',
              name: 'test',
            },
            value: 'This is a long text input',
            validate: (value) => value.toString().length < 3 || 'bill',
          },
        },
        'This is a long text input',
        false,
      ),
    ).toEqual({
      test: {
        type: 'validate',
        message: 'bill',
        ref: {
          type: 'text',
          name: 'test',
        },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'text',
              name: 'test',
            },
            value: 'This is a long text input',
            validate: (value) => value.toString().length < 3 || 'bill',
          },
        },
        'This is a long text input',
        false,
      ),
    ).toEqual({
      test: {
        type: 'validate',
        message: 'bill',
        ref: {
          type: 'text',
          name: 'test',
        },
      },
    });
  });

  it('if undefined returned from validate, no error is reported', async () => {
    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'text',
              name: 'test',
            },
            value: 'This is a long text input',
            validate: () => undefined,
          },
        },
        'This is a long text input',
        false,
      ),
    ).toEqual({});
  });

  it('should do nothing when validate is not an object nor function', async () => {
    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: {
              type: 'text',
              name: 'test',
            },
            value: 'This is a long text input',
            // @ts-expect-error
            validate: 'validate',
          },
        },
        'This is a long text input',
        false,
      ),
    ).toEqual({});
  });

  it('should return all validation errors', async () => {
    (getRadioValue as jest.Mock<any>).mockImplementation(() => ({
      value: '',
    }));

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'text', name: 'test' },
            value: '',
            required: true,
            minLength: 10,
            pattern: /d/i,
            validate: (value) => value === 'test',
          },
        },
        '',
        true,
      ),
    ).toEqual({
      test: {
        message: '',
        ref: {
          name: 'test',
          type: 'text',
        },
        type: 'required',
        types: {
          required: true,
          validate: true,
        },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'text', name: 'test' },
            value: '123',
            required: true,
            minLength: 10,
            pattern: /d/i,
            validate: (value) => value === 'test',
          },
        },
        '123',
        true,
      ),
    ).toEqual({
      test: {
        message: '',
        ref: {
          name: 'test',
          type: 'text',
        },
        type: 'minLength',
        types: {
          minLength: true,
          pattern: true,
          validate: true,
        },
      },
    });
  });

  it('should handle pattern with g flag', async () => {
    const reusedRe = /a/g;

    (getRadioValue as jest.Mock<any>).mockImplementation(() => ({
      value: '',
    }));
    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'text', name: 'test' },
            value: 'a',
            required: true,
            minLength: 10,
            pattern: reusedRe,
            validate: (value) => value === 'test',
          },
        },
        'a',
        true,
      ),
    ).toEqual({
      test: {
        message: '',
        ref: {
          name: 'test',
          type: 'text',
        },
        type: 'minLength',
        types: {
          minLength: true,
          validate: true,
        },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'text', name: 'test' },
            value: 'a',
            required: true,
            minLength: 10,
            pattern: reusedRe,
            validate: (value) => value === 'test',
          },
        },
        'a',
        true,
      ),
    ).toEqual({
      test: {
        message: '',
        ref: {
          name: 'test',
          type: 'text',
        },
        type: 'minLength',
        types: {
          minLength: true,
          validate: true,
        },
      },
    });
  });

  it('should return all validation error messages', async () => {
    (getRadioValue as jest.Mock<any>).mockImplementation(() => ({
      value: '',
    }));
    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'text', name: 'test' },
            value: '',
            required: 'test',
            minLength: {
              value: 10,
              message: 'minLength',
            },
            pattern: {
              value: /d/i,
              message: 'pattern',
            },
            validate: {
              test: (value) => value === 'test',
              test1: (value) => value == 'test' || 'Luo',
              test2: (value) => value == 'test' || 'Bill',
            },
          },
        },
        '',
        true,
      ),
    ).toEqual({
      test: {
        message: 'test',
        ref: {
          name: 'test',
          type: 'text',
        },
        type: 'required',
        types: {
          required: 'test',
          test: true,
          test1: 'Luo',
          test2: 'Bill',
        },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'text', name: 'test' },
            value: 'bil',
            required: 'test',
            minLength: {
              value: 10,
              message: 'minLength',
            },
            pattern: {
              value: /d/i,
              message: 'pattern',
            },
            validate: {
              test: (value) => value === 'test',
              test1: (value) => value == 'test' || 'Luo',
              test2: (value) => value == 'test' || 'Bill',
            },
          },
        },
        'bil',
        true,
      ),
    ).toEqual({
      test: {
        message: 'minLength',
        ref: {
          name: 'test',
          type: 'text',
        },
        type: 'minLength',
        types: {
          minLength: 'minLength',
          pattern: 'pattern',
          test: true,
          test1: 'Luo',
          test2: 'Bill',
        },
      },
    });

    expect(
      await validateField(
        {
          _f: {
            mount: true,
            name: 'test',
            ref: { type: 'text', name: 'test' },
            value: 'bil',
            required: 'test',
            minLength: {
              value: 10,
              message: 'minLength',
            },
            pattern: {
              value: /d/i,
              message: 'pattern',
            },
            validate: {
              test: (value) => value === 'test',
              test1: (value) => value == 'test' || 'Luo',
              test2: (value) => value == 'test' || 'Bill',
            },
          },
        },
        'bil',
        true,
      ),
    ).toEqual({
      test: {
        message: 'minLength',
        ref: {
          name: 'test',
          type: 'text',
        },
        type: 'minLength',
        types: {
          minLength: 'minLength',
          pattern: 'pattern',
          test: true,
          test1: 'Luo',
          test2: 'Bill',
        },
      },
    });
  });

  describe('with Browser native validation', () => {
    it('should invoke setCustomValidity for invalid input', () => {
      const setCustomValidity = jest.fn();
      const reportValidity = jest.fn();

      validateField(
        {
          _f: {
            name: 'test',
            ref: {
              setCustomValidity,
              reportValidity,
              name: 'test',
              value: '',
            },
            value: '',
            required: true,
            mount: true,
          },
        },
        '',
        false,
        true,
      );

      expect(setCustomValidity).toBeCalledWith(' ');
      expect(reportValidity).toBeCalled();
    });

    it('should invoke setCustomValidity for invalid input with its message', () => {
      const setCustomValidity = jest.fn();
      const reportValidity = jest.fn();

      validateField(
        {
          _f: {
            name: 'test',
            ref: {
              setCustomValidity,
              reportValidity,
              name: 'test',
              value: '',
            },
            value: '',
            required: 'something is wrong',
            mount: true,
          },
        },
        '',
        false,
        true,
      );

      expect(setCustomValidity).toBeCalledWith('something is wrong');
      expect(reportValidity).toBeCalled();
    });

    it('should invoke setCustomValidity with empty string for a valid input', () => {
      const setCustomValidity = jest.fn();
      const reportValidity = jest.fn();

      validateField(
        {
          _f: {
            name: 'test',
            ref: {
              setCustomValidity,
              reportValidity,
              name: 'test',
              value: 'test',
            },
            value: 'test',
            required: true,
            mount: true,
          },
        },
        'test',
        false,
        true,
      );

      expect(setCustomValidity).toBeCalledWith('');
      expect(reportValidity).toBeCalled();
    });

    it('should abort validation early when input is disabled', async () => {
      expect(
        await validateField(
          {
            _f: {
              name: 'test',
              ref: {
                name: 'test',
                value: '',
              },
              value: '',
              required: 'something is wrong',
              disabled: true,
            },
          },
          '',
          false,
        ),
      ).toEqual({});
    });
  });

  it('should validate field array with required attribute', async () => {
    expect(
      await validateField(
        {
          _f: {
            name: 'test',
            ref: {
              name: 'test',
              value: '',
            },
            value: undefined,
            required: true,
            mount: true,
          },
        },
        undefined,
        false,
        false,
        true,
      ),
    ).toEqual({
      test: {
        message: '',
        ref: {
          name: 'test',
          value: '',
        },
        type: 'required',
      },
    });

    expect(
      await validateField(
        {
          _f: {
            name: 'test',
            ref: {
              name: 'test',
              value: '',
            },
            value: [],
            required: true,
            mount: true,
          },
        },
        [],
        false,
        false,
        true,
      ),
    ).toEqual({
      test: {
        message: '',
        ref: {
          name: 'test',
          value: '',
        },
        type: 'required',
      },
    });

    expect(
      await validateField(
        {
          _f: {
            name: 'test',
            ref: {
              name: 'test',
              value: '',
            },
            value: null,
            required: true,
            mount: true,
          },
        },
        null,
        false,
        false,
        true,
      ),
    ).toEqual({
      test: {
        message: '',
        ref: {
          name: 'test',
          value: '',
        },
        type: 'required',
      },
    });

    expect(
      await validateField(
        {
          _f: {
            name: 'test',
            ref: {
              name: 'test',
              value: '',
            },
            value: [],
            required: true,
            mount: true,
          },
        },
        [{}],
        false,
        false,
        true,
      ),
    ).toEqual({});
  });
});
