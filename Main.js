(function () {
  const plugin = acode.require("plugin");
  const fs = acode.require("fs");
  const editorManager = acode.require("editorManager");

  plugin.onInstall = () => {
    window.toast("AI Assistant Installed");
  };

  plugin.onuninstall = () => {
    window.toast("AI Assistant Uninstalled");
  };

  plugin.onPluginStart = () => {
    acode.addIcon("🤖", "AI Assistant", async () => {
      const prompt = await promptInput("Ask AI");
      if (!prompt) return;

      const result = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "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"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }]
        })
      })
        .then(res => res.json())
        .catch(err => {
          window.toast("Error calling GPT");
          console.error(err);
        });

      if (result && result.choices) {
        const response = result.choices[0].message.content;
        editorManager.editor.insert(response);
      }
    });
  };
})();
