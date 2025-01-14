const html = `<!DOCTYPE html>
<html>
<title>城通网盘动态解析</title>

<head>
    <meta name="description" content="解析城通网盘直连地址" />
    <link rel="canonical" href="https://ctfile.qinlili.bid/redirect.html" />
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
    <link rel="manifest" href="https://cdn.jsdelivr.net/gh/Sunbangyan233/ctGetforWorker@main/manifest.json">
    <meta name="robots" content="noindex">
    <meta name="theme-color" content="#FFFFFF">
    <link rel="icon" href="./icon.png">
    <script src="https://cdn.jsdelivr.net/gh/Sunbangyan233/ctGetforWorker@main/ctget.js"></script>
</head>

<body id="container" style="width:100%;height:100%;">
    <div style="position: absolute;	left: 50%;top: 50%;width:328px;transform: translate(-50%,-50%);">
        <svg xmlns="http://www.w3.org/2000/svg" width="128px" height="128px" version="1" viewBox="0 0 16 16"
            style="padding-left:100px;padding-right: 100px;padding-bottom: 50px;" id="loadsvg">
            <style>
                @keyframes rotate {
                    0% {
                        transform: rotate(0deg)
                    }

                    to {
                        transform: rotate(360deg)
                    }
                }

                @keyframes fillunfill {
                    0% {
                        stroke-dashoffset: 32.3
                    }

                    50% {
                        stroke-dashoffset: 0
                    }

                    to {
                        stroke-dashoffset: -31.9
                    }
                }

                @keyframes rot {
                    0% {
                        transform: rotate(0deg)
                    }

                    to {
                        transform: rotate(-360deg)
                    }
                }

                @keyframes colors {

                    0%,
                    to {
                        stroke: #e87a90
                    }
                }
            </style>
            <g
                style="animation-duration:1568.63ms;animation-iteration-count:infinite;animation-name:rotate;animation-timing-function:linear;transform-origin:50% 50%;width:16px;height:16px">
                <path fill="none" d="M8 1.125A6.875 6.875 0 1 1 1.125 8" stroke-width="1.25" stroke-linecap="square"
                    style="animation-duration:1333ms,5332ms,5332ms;animation-fill-mode:forwards;animation-iteration-count:infinite,infinite,infinite;animation-name:fillunfill,rot,colors;animation-play-state:running,running,running;animation-timing-function:cubic-bezier(.4,0,.2,1),steps(4),linear;transform-origin:50% 50%"
                    stroke-dasharray="32.4" stroke-dashoffset="32.4" />
            </g>
        </svg>
        <H3 id="loadtext" style="text-align:center;width:100%;">正在获取下载地址</H3>
    </div>
</body>
<script>
    const funDownload = (content, filename) => {
        var eleLink = document.createElement('a');
        eleLink.download = filename;
        eleLink.style.display = 'none';
        eleLink.href = content;
        document.body.appendChild(eleLink);
        eleLink.click();
        document.body.removeChild(eleLink);
    };
    const searchParams = new URLSearchParams(document.location.search);
    const fileid = searchParams.get("file");
    var password = "1416"
    if (searchParams.get("pass")) {
        password = searchParams.get("pass")
    }
    const dl = async () => {
        const fileInfo = await ctfile.getByID(fileid, password)
        if (fileInfo.success) {
            document.getElementById("loadtext").innerText = "正在发起下载"
            funDownload(fileInfo.link, fileInfo.name)
        } else {
            document.getElementById("loadtext").innerText = "出错了，错误原因是:" + fileInfo.errormsg;
        }
    }
    dl();
</script>

</html>`;

async function handleRequest(request) {
  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  });
}

addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request));
});
