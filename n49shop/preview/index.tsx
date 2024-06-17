import { state } from "../../n49shop/mod.ts";

export default function Preview() {
  const publicUrl = state?.publicUrl;
  const apiKey = state?.apiKey;

  return (
    <div class="flex flex-col items-center justify-center h-full">
      <a href="https://www.n49.com.br/" style={{ marginTop: "16px" }}>
        <img
          alt="N49shop"
          src="https://suporte.n49.com.br/assets/images/logo/logo.png"
          width="120"
          height="90"
        />
      </a>
      <div class="w-full flex flex-wrap justify-center p-4 gap-4">
        <div
          class="w-full flex flex-col items-center gap-2"
          style={{
            background: "#272D4B",
            color: "white",
            borderRadius: "16px",
            padding: "24px",
            maxWidth: "450px",
          }}
        >
          <h1>N49shop Settings</h1>
          <div class="w-full flex flex-col gap-4">
            <label class="flex flex-col">
              <strong>Public URL</strong>
              <p>
                {publicUrl ||
                  "Your N49shop URL, example: https://yourstore.api.n49shop.com.br/"}
              </p>
            </label>
            <label class="flex flex-col gap-2">
              <strong>API KEY</strong>
                {apiKey}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
