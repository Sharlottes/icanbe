class VideoRecorder {
  public video: HTMLVideoElement | null = null;
  public mediaRecorder: MediaRecorder | null = null;
  public readonly chunks: Blob[] = [];

  public constructor(public readonly videoId: string) {}

  public async startVideo() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 1920, height: 1080 },
    });
    this.video ??= document.getElementById(this.videoId) as HTMLVideoElement;
    this.video.srcObject = stream;
    this.video.play();
  }

  public captureVideo() {
    const canvas = document.createElement("canvas");

    canvas.width = 1920;
    canvas.height = 1080;

    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(this.video!, 0, 0, canvas.width, canvas.height);

    const url = canvas.toDataURL("image/jpeg");
    canvas.remove();
    return url;
  }
}

export default VideoRecorder;
