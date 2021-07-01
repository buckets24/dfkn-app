export const Form = {
  parts: [
    'formControl',
    'formLabel',
    'formInput',
    'formCheckbox',
    'formRadio',
    'formTextArea',
    'formHelper',
    'formError',
  ],
  baseStyle: {
    formControl: {
      mb: [5, null, 0],
    },
    formLabel: {
      fontWeight: 500,
      whiteSpace: 'nowrap',
      _invalid: {
        color: 'support.alert.500',
      },
      _disabled: {
        bg: 'transparent',
        color: 'gray.800',
        cursor: 'not-allowed',
        pointerEvents: 'none',
        borderColor: 'gray.300',
        opacity: 0.7,
      },
    },
    formInput: {
      d: 'block', // I don't understand why this is needed, but if you see this feel free to ask me why it is added
      borderWidth: '1px',
      borderColor: 'gray.300',
      borderRadius: '4px',
      fontWeight: 500,
      _focus: {
        zIndex: 0,
        borderColor: 'documents.primary.500',
      },
      _invalid: {
        borderColor: 'support.alert.500',
      },
      _placeholder: {
        color: '#93A1B5',
      },
      _readOnly: {
        bg: 'transparent',
        borderColor: 'gray.300',
      },
      _disabled: {
        bg: 'transparent',
        color: 'gray.800',
        cursor: 'not-allowed',
        pointerEvents: 'none',
        borderColor: 'gray.300',
        opacity: 0.7,
      },
    },
    formCheckbox: {
      borderColor: 'gray.300',
      borderRadius: '2px',
      _groupHover: {
        borderColor: 'documents.primary.500',
      },
    },
    formRadio: {
      borderWidth: '2px',
      borderColor: 'gray.300',
      cursor: 'pointer',
      _hover: {
        borderColor: 'documents.primary.500',
      },
      _checked: {
        bg: 'documents.primary.500',
      },
      _invalid: {
        borderColor: 'support.alert.500',
      },
    },
    formTextArea: {
      w: '100%',
      h: '100%',
    },
    formHelper: {
      color: 'gray.600',
      lineHeight: '16px',
    },
    formError: {
      m: 0,
      color: 'support.alert.500',
      lineHeight: '16px',
    },
  },
  sizes: {
    sm: {
      formLabel: {
        fontSize: '0.625rem',
      },
      formInput: {
        h: '32px',
        fontSize: 'xs',
      },
      formRadio: {
        w: '12px',
        h: '12px',
      },
      formTextArea: {
        minH: '32px',
        fontSize: 'xs',
      },
      formHelper: {
        fontSize: 'xs',
      },
      formError: {
        fontSize: 'xs',
      },
    },
    md: {
      formLabel: {
        fontSize: 'xs',
      },
      formInput: {
        h: '40px',
        fontSize: 'sm',
      },
      formRadio: {
        mt: 1,
        w: '16px',
        h: '16px',
      },
      formTextArea: {
        minH: '40px',
        fontSize: 'sm',
      },
      formHelper: {
        fontSize: 'xs',
      },
      formError: {
        fontSize: 'sm',
      },
    },
    lg: {
      formLabel: {
        fontSize: 'sm',
      },
      formInput: {
        h: '48px',
        fontSize: 'md',
      },
      formRadio: {
        w: '24px',
        h: '24px',
      },
      formTextArea: {
        minH: '48px',
        fontSize: 'md',
      },
      formHelper: {
        fontSize: 'xs',
      },
      formError: {
        fontSize: 'sm',
      },
    },
  },
  variants: {
    default: {
      formCheckbox: {
        borderColor: 'documents.secondary.700',
        backgroundColor: '#D6D7E2',
      },
      formInput: {
        pl: 3,
        pr: 3,
      },
    },
    checked: {
      formCheckbox: {
        borderColor: 'documents.secondary.700',
        backgroundColor: 'documents.secondary.700',
      },
    },
    invalid: {
      formCheckbox: {
        borderColor: 'support.alert.500',
      },
    },
    flushed: {
      formInput: {
        pl: 4,
        minH: '56px',
        bg: 'rgba(0, 0, 0, 0.03)',
        borderTop: 'none',
        borderRight: 'none',
        borderLeft: 'none',
        borderBottomWidth: '2px',
        borderBottomColor: 'rgba(0, 0, 0, 0.36)',
        borderRadius: '4px 4px 0px 0px',
        _hover: {
          bg: 'rgba(0, 0, 0, 0.1)',
          borderTop: 'none',
          borderRight: 'none',
          borderLeft: 'none',
        },
        _focus: {
          borderTop: 'none',
          borderRight: 'none',
          borderLeft: 'none',
          boxShadow: 'none',
        },
        _invalid: {
          borderTop: 'none',
          borderRight: 'none',
          borderLeft: 'none',
          boxShadow: 'none',
        },
        _disabled: {
          bg: 'gray.200',
          pointerEvent: 'none',
        },
        _readOnly: {
          bg: 'rgba(0, 0, 0, 0.03)',
          borderBottomColor: 'rgba(0, 0, 0, 0.36)',
        },
      },
      formHelper: {
        ml: 3,
      },
      formError: {
        ml: 3,
      },
      formLabel: {
        position: 'absolute',
        zIndex: 1,
        left: 4,
        maxW: '80%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        _focus: { position: 'absolute', top: 2, left: 4, fontSize: 'xs', color: 'documents.primary.500' },
      },
    },
    dotted: {
      formLabel: {
        fontFamily: 'mono',
        fontWeight: 500,
        color: 'documents.secondary.700',
      },
      formInput: {
        height: '40px',
        color: 'documents.secondary.700',
        borderWidth: '1px',
        borderColor: 'documents.secondary.700',
        borderRadius: 'none',
        borderStyle: 'dotted',
        fontWeight: 'bold',
        _focus: {
          zIndex: 0,
          orderStyle: 'solid',
          borderColor: 'documents.primary.500',
        },
        _hover: {
          borderColor: 'documents.secondary.300',
        },
        _invalid: {
          borderColor: 'support.alert.500',
        },
        _readOnly: {
          bg: 'documents.primary.200',
          borderColor: 'documents.secondary.300',
          color: 'documents.secondary.700',
          pointerEvent: 'none',
        },
      },
      formRadio: {
        bg: 'white',
        borderWidth: '2px',
        borderColor: 'documents.secondary.700',
        cursor: 'pointer',
        _hover: {
          borderColor: 'documents.secondary.700',
        },
        _checked: {
          bg: 'documents.secondary.700',
          borderColor: 'documents.secondary.700',
        },
        _invalid: {
          borderColor: 'support.alert.500',
        },
      },
      formTextArea: {
        bg: 'documents.primary.200',
        color: 'documents.secondary.700',
        borderWidth: '1px',
        borderColor: 'documents.secondary.700',
        borderRadius: 'none',
        borderStyle: 'dotted',
        fontWeight: 'bold',
        fontSize: 'sm',
        _focus: {
          bg: 'documents.primary.200',
          zIndex: 0,
          orderStyle: 'solid',
          borderColor: 'documents.primary.500',
        },
        _hover: {
          bg: 'documents.primary.200',
          borderColor: 'documents.secondary.300',
        },
        _invalid: {
          bg: 'documents.primary.200',
          borderColor: 'support.alert.500',
        },
        _readOnly: {
          bg: 'documents.primary.200',
          pointerEvent: 'none',
        },
      },
    },
    ghost: {
      formInput: {
        height: '20px',
        color: 'documents.secondary.700',
        bg: 'transparent',
        border: 'none',
        borderRadius: 'none',
        fontSize: 'sm',
        fontWeight: 'bold',
        _focus: {
          zIndex: 0,
          borderColor: 'documents.primary.500',
        },
        _hover: {
          borderColor: 'documents.secondary.300',
        },
        _invalid: {
          borderColor: 'support.alert.500',
        },
      },
    },
    'text-ghost': {
      formInput: {
        height: '20px',
        bg: 'transparent',
        border: 'none',
        borderRadius: 'none',
        fontSize: 'sm',
        fontWeight: 400,
        _focus: {
          zIndex: 0,
          borderColor: 'documents.primary.500',
        },
        _hover: {
          borderColor: 'documents.secondary.300',
        },
        _invalid: {
          borderColor: 'support.alert.500',
        },
      },
    },
    'dotted-flush': {
      formInput: {
        p: 0,
        bg: 'transparent',
        height: '40px',
        color: 'documents.secondary.700',
        borderTop: 'none',
        borderRight: 'none',
        borderLeft: 'none',
        borderBottomWidth: '1px',
        borderBottomColor: 'documents.secondary.700',
        borderRadius: 'none',
        borderStyle: 'dotted',
        fontWeight: 'bold',
        _focus: {
          zIndex: 0,
          orderStyle: 'solid',
          borderColor: 'documents.primary.500',
        },
        _hover: {
          borderColor: 'documents.secondary.300',
        },
        _invalid: {
          borderColor: 'support.alert.500',
        },
        _disabled: {
          bg: 'gray.100',
          borderTop: 'none',
          borderRight: 'none',
          borderLeft: 'none',
          borderBottomWidth: '1px',
          borderBottomColor: 'documents.secondary.700',
          pointerEvents: 'none',
        },
        _readOnly: {
          color: 'documents.secondary.700',
          bg: 'transparent',
          borderBottomColor: 'documents.secondary.700',
        },
      },
    },
  },
  defaultProps: {
    size: 'md',
  },
};
