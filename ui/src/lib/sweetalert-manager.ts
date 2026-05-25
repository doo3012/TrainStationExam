import Swal from "sweetalert2";

type AlertType = "success" | "error" | "warning" | "info";

class SweetAlertManager {
  private static instance: SweetAlertManager;
  private isShowingAlert = false;
  private alertQueue: Array<{
    message: string;
    type: AlertType;
    callback?: () => void;
  }> = [];

  public static getInstance(): SweetAlertManager {
    if (!SweetAlertManager.instance) {
      SweetAlertManager.instance = new SweetAlertManager();
    }

    return SweetAlertManager.instance;
  }

  public async showAlert(
    message: string,
    type: AlertType = "info",
    callback?: () => void,
  ): Promise<void> {
    if (this.isShowingAlert) {
      this.alertQueue.push({ message, type, callback });
      return;
    }

    this.isShowingAlert = true;

    try {
      await Swal.fire({
        title: this.getTitleByType(type),
        text: message,
        icon: type,
        confirmButtonText: "ตกลง",
      });

      callback?.();
      this.isShowingAlert = false;
      this.showNextAlert();
    } catch (error) {
      this.isShowingAlert = false;
      console.error("Error showing alert:", error);
    }
  }

  public showToast(
    message: string,
    type: AlertType = "success",
    timer = 1500,
    callback?: () => void,
  ): void {
    void Swal.fire({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
      icon: type,
      title: message,
      didClose: () => {
        callback?.();
      },
    });
  }

  public async showConfirm(message: string): Promise<boolean> {
    const result = await Swal.fire({
      title: this.getTitleByType("warning"),
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#dc2626",
    });

    return result.isConfirmed;
  }

  private showNextAlert(): void {
    if (this.alertQueue.length > 0) {
      const nextAlert = this.alertQueue.shift();

      if (nextAlert) {
        void this.showAlert(
          nextAlert.message,
          nextAlert.type,
          nextAlert.callback,
        );
      }
    }
  }

  private getTitleByType(type: AlertType): string {
    switch (type) {
      case "success":
        return "สำเร็จ";
      case "error":
        return "เกิดข้อผิดพลาด";
      case "warning":
        return "แจ้งเตือน";
      default:
        return "ข้อความ";
    }
  }

  public clearQueue(): void {
    this.alertQueue = [];
    this.isShowingAlert = false;
  }
}

export const alertManager = SweetAlertManager.getInstance();
