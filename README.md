### 需求

1. 自定義題型 JSON
2. 自定義渲染與儲存

### 參考

* https://surveyjs.io/form-library/documentation/customize-question-types/third-party-component-integration-vue

### Custom Question Type 實作步驟

1. 新增一個 ```.vue``` 檔，```./src/components/QuestionCustom.vue```

* 建立並繼承``` survey-core ```的``` Question ```基底模型，用於自定義問題的屬性或方法
* 註冊``` survey-core ```的```Serializer```，用於將模型序列化成 JSON 格式

```
<script>
import { Question, Serializer } from "survey-core";
const CUSTOM_TYPE = "custom-question";
export class QuestionCustomModel extends Question {
   getType() {
      return CUSTOM_TYPE;
   }
 }
Serializer.addClass(
    CUSTOM_TYPE,
    [{}],
    function () {
      return new QuestionCustomModel("")
    },
    "question"
 );
```

2. 利用 Vue 組件實作 Custom Question 的內容與邏輯

* 定義```props```用來接收 _SurveyJS_ 渲染套件傳入的 Question Model 實例，因此可以透過 ```porps.question``` 存取與更新問題的屬性
* 透過```ref()```建立一個響應式物件，用來存放問題的值
* 實作```updateValue()```方法，用來更新 Question 的值

``` javascript
<script setup>
const props = defineProps({
      question: {
          type: Object,
          required: true,
      }
  }
)

const customValue = ref(null);

function updateValue(val) {
 customValue.value = val;
 props.question.value = customValue.value;
}
</script>
<template>
<div>
  <el-input v-model="customValue" @input="updateValue($event)" />
</div>
</template>
```

3. 在 main.js 中註冊自定義問題組件至 Vue 實例

* 注意組件名稱需要以```survey-```為前綴搭配你的```CUSTOM_TYPE```

``` javascript
app.component("survey-custom-question", QuestionCustom);
```

/*
因為我們的 value 是打算存 object 的，所以之前問你說哪些內建的題目也是用 object 的，那時候說是 matrix，所以就找
matrixdropdown
的原始碼來看（https://github.com/surveyjs/survey-library/blob/0aee614a4aab61aab3e90d8af5e81dd6ae63fff9/packages/survey-core/src/question_matrixdropdown.ts#L47C14-L47C41）
發現他的細節都在
QuestionMatrixDropdownModelBase（https://github.com/surveyjs/survey-library/blob/0aee614a4aab61aab3e90d8af5e81dd6ae63fff9/packages/survey-core/src/question_matrixdropdownbase.ts#L907）
然後他又繼承 QuestionMatrixBaseModel 然後這個又繼承一個 Question，我又在裡面搜尋 value 相關的
找到這列 https://github.com/surveyjs/survey-library/blob/aaf391325b981ca92d2e00224831f92bfed9d131/packages/survey-core/src/question.ts#L1662
進去裡面看this.setNewValue
的實作細節（https://github.com/surveyjs/survey-library/blob/aaf391325b981ca92d2e00224831f92bfed9d131/packages/survey-core/src/question.ts#L2395）

總而言之，
我們在 trace set value(newValue) 的過程中，追蹤到它會呼叫到 isNewValueEqualsToValue(newValue)

裡面實作的細節
https://github.com/surveyjs/survey-library/blob/aaf391325b981ca92d2e00224831f92bfed9d131/packages/survey-core/src/question.ts#L2422

然後我在 Chrome 裡面設斷點，發現到 this.value 跟 newValue 竟然是一樣的，驚喜不驚喜，意外不意外 😂 !!!
也因為如此，SurveyJS 壓根就沒有偵測到 value 的變化，所以也就不會反映到 survey.data 上，因此永遠都是一開始由後端取回來的值

這就讓我想到：為啥會有這個問題咧？

噢！肯定是 reactive 跟他藕斷絲連
因此透過浅拷貝 { ...props.question.value } 來解決這個問題

*/