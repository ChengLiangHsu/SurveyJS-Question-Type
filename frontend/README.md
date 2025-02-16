/*
因為我們的 value 是打算存 object 的，所以之前問你說哪些內建的題目也是用 object 的，那時候說是 matrix，所以就找 matrixdropdown 的原始碼來看（https://github.com/surveyjs/survey-library/blob/0aee614a4aab61aab3e90d8af5e81dd6ae63fff9/packages/survey-core/src/question_matrixdropdown.ts#L47C14-L47C41）
發現他的細節都在 QuestionMatrixDropdownModelBase（https://github.com/surveyjs/survey-library/blob/0aee614a4aab61aab3e90d8af5e81dd6ae63fff9/packages/survey-core/src/question_matrixdropdownbase.ts#L907）
然後他又繼承 QuestionMatrixBaseModel 然後這個又繼承一個 Question，我又在裡面搜尋 value 相關的
找到這列 https://github.com/surveyjs/survey-library/blob/aaf391325b981ca92d2e00224831f92bfed9d131/packages/survey-core/src/question.ts#L1662
進去裡面看this.setNewValue 的實作細節（https://github.com/surveyjs/survey-library/blob/aaf391325b981ca92d2e00224831f92bfed9d131/packages/survey-core/src/question.ts#L2395）

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
