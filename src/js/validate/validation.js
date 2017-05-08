import { Validator } from 'vee-validate';
Validator.extend('mobile', {
    messages: {
      cn:field => '请输入正确手机号码',
    },
    validate: value => {
      return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    }
});
Validator.extend('bank', {
    messages: {
      cn:field => '请输入19位银行卡号',
    },
    validate: value => {
      return /^\d{19}$/.test(value)
    }
});
Validator.extend('carNo', {
    messages: {
      cn:field => '车辆号格式错误',
    },
    validate: value => {
      return /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/.test(value)
    }
});
Validator.extend('idNo', {
    messages: {
      cn:field => '身份证格式错误',
    },
    validate: value => {
      return /(\d{14}[0-9a-zA-Z])|(\d{17}[0-9a-zA-Z])/.test(value)
    }
});

