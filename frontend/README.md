### Custom Question Type

1. 新建自定義問題的 ```.vue``` 檔案
2. 建立並繼承```survey-core```的```Question```基底模型
   ```
    import { Question } from "survey-core";
    const CUSTOM_TYPE = "<自定義題型名稱>"; 
    export class QuestionCustomModel extends Question {
      getType() {
      return CUSTOM_TYPE;
      }
    }
   ```
3. 註冊```survey-core```的```Serializer```，
   ```
    import { Question } from "survey-core";
    const CUSTOM_TYPE = "<自定義題型名稱>"; 
    export class QuestionCustomModel extends Question {
      getType() {
      return CUSTOM_TYPE;
      }
    }
   ``` 
