<script>
import {Question, Serializer} from "survey-core";

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
      return new QuestionCustomModel("");
    },
    "question"
);
</script>
<script setup>
const props = defineProps({
      question: {
        type: Object,
        required: true,
      }
    }
)

const customValue = ref(
    {
      value: "",
      select: "",
    }
);

function updateValue(val) {
  customValue.value = val;
  props.question.value = customValue.value;
}
</script>
<template>
  <div>
    <el-input
        v-model="customValue.value"
        @change="updateValue(customValue)"
    >
      <template #prepend>
        <el-select
            v-model="customValue.select"
            placeholder="Select"
            style="width: 115px"
            @change="updateValue(customValue)"
        >
          <el-option label="Restaurant" value="1"/>
          <el-option label="Order No." value="2"/>
          <el-option label="Tel" value="3"/>
        </el-select>
      </template>
    </el-input>
  </div>
  {{ customValue }}
</template>