export async function loadShaderSource(source) {
  const response = await fetch(source, { cache: "no-cache" });

  if (!response.ok) {
    throw new Error(`无法载入 Shader：${source}`);
  }

  return response.text();
}
