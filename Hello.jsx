(function() {
    // --- 1. 許可するグローバルIPアドレスを指定 ---
    var allowedIP = "198.144.169.12"; 

    // --- 2. 現在のグローバルIPを取得する関数 ---
    function getGlobalIP() {
        var tempIPFile = new File(Folder.temp + "/current_ip.txt");
        
        // 【修正ポイント】
        // 1. APIを ipアドレスのみ返す 'https://ifconfig.me/ip' に変更
        // 2. Out-File で Encoding を utf8 に指定して文字化けを防止
        var getIPCmd = 'powershell -WindowStyle Hidden -Command "(Invoke-RestMethod -Uri \'https://ifconfig.me/ip\').Trim() | Out-File -FilePath \'' + tempIPFile.fsName + '\' -Encoding utf8"';
        
        app.system(getIPCmd);
        
        var ip = "";
        if (tempIPFile.exists) {
            // ファイルが書き込まれるまで僅かに待機（環境により必要な場合あり）
            $.sleep(500); 
            
            tempIPFile.open("r");
            ip = tempIPFile.read();
            tempIPFile.close();
            tempIPFile.remove();
        }
        
        // 余計な空白や改行を徹底的に除去
        return ip.replace(/^\s+|\s+$/g, "");
    }

    // --- 3. 判定と実行 ---
    var currentIP = getGlobalIP();

    if (currentIP === allowedIP) {
        alert("認証成功\nIP: " + currentIP);
        // ここにメインの処理を書くか、GitHubからevalで読み込む
    } else {
        alert("アクセス権限がありません。\nあなたのIP: " + (currentIP || "取得失敗"));
    }

})();
