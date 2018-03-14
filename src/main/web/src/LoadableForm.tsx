import Loadable from 'react-loadable';

export const Form = Loadable({
    loader: () => import(/* webpackChunkName: "react-form" */ 'react-form').then((ReactForm) => {
        return ReactForm.Form;
    }),
    loading: () => null
});

export const Text = Loadable({
    loader: () => import(/* webpackChunkName: "react-form" */ 'react-form').then((ReactForm) => {
        return ReactForm.Text;
    }),
    loading: () => null
});

export const Checkbox = Loadable({
    loader: () => import(/* webpackChunkName: "react-form" */ 'react-form').then((ReactForm) => {
        return ReactForm.Checkbox;
    }),
    loading: () => null
});

export const NestedForm = Loadable({
    loader: () => import(/* webpackChunkName: "react-form" */ 'react-form').then((ReactForm) => {
        return ReactForm.NestedForm;
    }),
    loading: () => null
});

export const Radio = Loadable({
    loader: () => import(/* webpackChunkName: "react-form" */ 'react-form').then((ReactForm) => {
        return ReactForm.Radio;
    }),
    loading: () => null
});

export const RadioGroup = Loadable({
    loader: () => import(/* webpackChunkName: "react-form" */ 'react-form').then((ReactForm) => {
        return ReactForm.RadioGroup;
    }),
    loading: () => null
});

export const Select = Loadable({
    loader: () => import(/* webpackChunkName: "react-form" */ 'react-form').then((ReactForm) => {
        return ReactForm.Select;
    }),
    loading: () => null
});

export const StyledCheckbox = Loadable({
    loader: () => import(/* webpackChunkName: "react-form" */ 'react-form').then((ReactForm) => {
        return ReactForm.StyledCheckbox;
    }),
    loading: () => null
});

export const StyledRadio = Loadable({
    loader: () => import(/* webpackChunkName: "react-form" */ 'react-form').then((ReactForm) => {
        return ReactForm.StyledRadio;
    }),
    loading: () => null
});

export const StyledRadioGroup = Loadable({
    loader: () => import(/* webpackChunkName: "react-form" */ 'react-form').then((ReactForm) => {
        return ReactForm.StyledRadioGroup;
    }),
    loading: () => null
});

export const StyledSelect = Loadable({
    loader: () => import(/* webpackChunkName: "react-form" */ 'react-form').then((ReactForm) => {
        return ReactForm.StyledSelect;
    }),
    loading: () => null
});

export const StyledText = Loadable({
    loader: () => import(/* webpackChunkName: "react-form" */ 'react-form').then((ReactForm) => {
        return ReactForm.StyledText;
    }),
    loading: () => null
});

export const StyledTextArea = Loadable({
    loader: () => import(/* webpackChunkName: "react-form" */ 'react-form').then((ReactForm) => {
        return ReactForm.StyledTextArea;
    }),
    loading: () => null
});

export const TextArea = Loadable({
    loader: () => import(/* webpackChunkName: "react-form" */ 'react-form').then((ReactForm) => {
        return ReactForm.TextArea;
    }),
    loading: () => null
});

// programmatic export not done due to not being able to autocomplete
// const loaders = ['Form', 'Text', 'Checkbox', 'FormField', 'NestedForm', 'Radio',
//     'RadioGroup', 'Select', 'StyledCheckbox', 'StyledRadio', 'StyledRadioGroup', 'StyledSelect', 'StyledTextArea',
//     'TextArea'].map((value) => {
//     return [value, Loadable({
//         loader: () => import(/* webpackChunkName: "react-form" */ 'react-form').then((ReactForm) => {
//             return ReactForm[value];
//         }),
//         loading: () => null
//     })];
// });
//
// const Loaders = new Map(loaders.entries());
//
// export { Loaders };