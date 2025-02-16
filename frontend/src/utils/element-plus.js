import { ElMessage } from "element-plus";

class ShowMessage {
  constructor() {
    this.ElMessage = ElMessage;
  }

  success(message) {
    this.show("success", message);
  }

  warning(message) {
    this.show("warning", message);
  }

  info(message) {
    this.show("info", message);
  }

  error(message) {
    this.show("error", message);
  }

  show(type, message) {
    //   // 秀 message 之前先關閉所有的 message (一次只有一則)
    // 也可以將 grouping 設定為 true，讓相同的訊息群組起來，grouping 的樣式為 badge，已處理好樣式
    this.ElMessage.closeAll();

    this.ElMessage({
      // 訊息內容
      message,
      // 關閉週期
      duration: 2000,
      // 顯示模式: success / info / warning / error
      type,
      // 群組，會將內容相同的訊息群組起來
      grouping: false,
    });
  }
}

export const showMessage = new ShowMessage();
