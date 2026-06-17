// danmaku-wall.js
(function() {
    // 可复用的弹幕墙创建函数
    function createDanmakuWall(containerId, rawTextLines) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // 解析弹幕数据
        let danmakuList = [];
        for (let line of rawTextLines) {
            line = line.trim();
            if (line.length > 0) danmakuList.push(line);
        }

        if (danmakuList.length < 5) {
            danmakuList.push("补充弹幕示例：医疗资源紧张。");
            danmakuList.push("等待时间过长是普遍现象。");
            danmakuList.push("希望改善医疗服务效率。");
        }

        const TRACK_COUNT = 5;
        const tracksData = Array.from({ length: TRACK_COUNT }, () => []);
        for (let i = 0; i < danmakuList.length; i++) {
            tracksData[i % TRACK_COUNT].push(danmakuList[i]);
        }

        container.innerHTML = '';
        const tracks = [];

        for (let i = 0; i < TRACK_COUNT; i++) {
            const trackDiv = document.createElement('div');
            trackDiv.className = 'track';
            trackDiv.style.position = 'relative';
            trackDiv.style.width = '100%';
            trackDiv.style.height = '20%';
            trackDiv.style.overflow = 'visible';

            const danmakuDiv = document.createElement('div');
            danmakuDiv.className = 'danmaku';
            danmakuDiv.style.position = 'absolute';
            danmakuDiv.style.whiteSpace = 'nowrap';
            danmakuDiv.style.left = '100%';
            danmakuDiv.style.top = '50%';
            danmakuDiv.style.transform = 'translateY(-50%)';
            danmakuDiv.style.transition = 'left linear';
            danmakuDiv.textContent = '';
            trackDiv.appendChild(danmakuDiv);
            container.appendChild(trackDiv);

            tracks.push({
                index: i,
                queue: [...tracksData[i]],
                currentDanmaku: danmakuDiv,
                timer: null,
                transitionHandler: null,
                isPaused: false,
                pausedLeft: 0,
                pauseTime: 0,
                remainingDuration: 0,
                startLeft: 0,
                endLeft: 0,
                totalDuration: 0
            });
        }

        function getContainerWidth() {
            return container.clientWidth;
        }

        function getDuration(danmakuElement, containerWidth) {
            const danmakuWidth = danmakuElement.offsetWidth;
            const distance = containerWidth + danmakuWidth;
            const speed = 120;
            let duration = distance / speed;
            duration = Math.min(18, Math.max(4, duration));
            return duration;
        }

        function startDanmaku(track, text, startLeftPercent = 100, remainingDuration = null) {
            const danmaku = track.currentDanmaku;
            danmaku.textContent = text;

            if (track.timer) {
                clearTimeout(track.timer);
                track.timer = null;
            }
            if (track.transitionHandler) {
                danmaku.removeEventListener('transitionend', track.transitionHandler);
                track.transitionHandler = null;
            }

            const containerW = getContainerWidth();
            const danmakuWidth = danmaku.offsetWidth;
            let endLeft = -danmakuWidth;
            let duration;

            if (remainingDuration !== null && startLeftPercent !== 100) {
                const startLeft = (startLeftPercent / 100) * containerW;
                duration = remainingDuration;
                danmaku.style.transition = 'none';
                danmaku.style.left = startLeft + 'px';
                void danmaku.offsetHeight;
                danmaku.style.transition = `left ${duration}s linear`;
                danmaku.style.left = endLeft + 'px';
            } else {
                duration = getDuration(danmaku, containerW);
                danmaku.style.transition = 'none';
                danmaku.style.left = '100%';
                void danmaku.offsetHeight;
                danmaku.style.transition = `left ${duration}s linear`;
                danmaku.style.left = endLeft + 'px';
            }

            const startLeftPx = parseFloat(danmaku.style.left) || containerW;
            track.startLeft = startLeftPx;
            track.endLeft = endLeft;
            track.totalDuration = duration;
            track.isPaused = false;

            const onTransitionEnd = (e) => {
                if (e.target === danmaku) {
                    danmaku.removeEventListener('transitionend', onTransitionEnd);
                    track.transitionHandler = null;
                    track.timer = setTimeout(() => {
                        playNextInTrack(track);
                    }, 300);
                }
            };
            danmaku.addEventListener('transitionend', onTransitionEnd);
            track.transitionHandler = onTransitionEnd;

            track.timer = setTimeout(() => {
                if (track.transitionHandler) {
                    danmaku.removeEventListener('transitionend', track.transitionHandler);
                    track.transitionHandler = null;
                }
                playNextInTrack(track);
            }, duration * 1000 + 500);
        }

        function playNextInTrack(track) {
            if (track.isPaused) return;
            if (!track || !track.currentDanmaku || !track.currentDanmaku.parentNode) return;

            if (track.timer) {
                clearTimeout(track.timer);
                track.timer = null;
            }
            if (track.transitionHandler) {
                track.currentDanmaku.removeEventListener('transitionend', track.transitionHandler);
                track.transitionHandler = null;
            }

            if (track.queue.length === 0) {
                track.queue = [...tracksData[track.index]];
            }

            const text = track.queue.shift();
            if (!text) return;
            startDanmaku(track, text);
        }

        function pauseTrack(track) {
            if (track.isPaused) return;
            const danmaku = track.currentDanmaku;
            if (!danmaku || !danmaku.textContent) return;

            const computedLeft = window.getComputedStyle(danmaku).left;
            const currentLeftPx = parseFloat(computedLeft);
            if (isNaN(currentLeftPx)) return;

            const transitionDuration = window.getComputedStyle(danmaku).transitionDuration;
            let remainingMs = 0;
            if (transitionDuration && transitionDuration !== '0s') {
                const totalDuration = track.totalDuration;
                const start = track.startLeft;
                const end = track.endLeft;
                const totalDist = Math.abs(end - start);
                const traveledDist = Math.abs(currentLeftPx - start);
                const elapsedRatio = totalDist === 0 ? 0 : traveledDist / totalDist;
                const elapsedTime = totalDuration * elapsedRatio;
                const remainingTime = totalDuration - elapsedTime;
                remainingMs = remainingTime * 1000;
            }

            if (track.timer) {
                clearTimeout(track.timer);
                track.timer = null;
            }
            if (track.transitionHandler) {
                danmaku.removeEventListener('transitionend', track.transitionHandler);
                track.transitionHandler = null;
            }
            danmaku.style.transition = 'none';
            danmaku.style.left = currentLeftPx + 'px';

            track.isPaused = true;
            track.pausedLeft = currentLeftPx;
            track.remainingDuration = remainingMs > 0 ? remainingMs / 1000 : 0;
            track.pauseTime = Date.now();
        }

        function resumeTrack(track) {
            if (!track.isPaused) return;
            const danmaku = track.currentDanmaku;
            if (!danmaku || !danmaku.textContent) return;

            track.isPaused = false;
            const containerW = getContainerWidth();
            const danmakuWidth = danmaku.offsetWidth;
            const endLeft = -danmakuWidth;
            const currentLeft = track.pausedLeft;

            let remainingDuration = track.remainingDuration;
            if (remainingDuration <= 0) {
                danmaku.style.transition = 'none';
                danmaku.style.left = endLeft + 'px';
                setTimeout(() => {
                    if (!track.isPaused && track.currentDanmaku === danmaku) {
                        playNextInTrack(track);
                    }
                }, 50);
                return;
            }

            danmaku.style.transition = 'none';
            danmaku.style.left = currentLeft + 'px';
            void danmaku.offsetHeight;
            danmaku.style.transition = `left ${remainingDuration}s linear`;
            danmaku.style.left = endLeft + 'px';

            track.startLeft = currentLeft;
            track.endLeft = endLeft;
            track.totalDuration = remainingDuration;

            const onTransitionEnd = (e) => {
                if (e.target === danmaku) {
                    danmaku.removeEventListener('transitionend', onTransitionEnd);
                    track.transitionHandler = null;
                    if (!track.isPaused) {
                        track.timer = setTimeout(() => {
                            playNextInTrack(track);
                        }, 300);
                    }
                }
            };
            danmaku.addEventListener('transitionend', onTransitionEnd);
            track.transitionHandler = onTransitionEnd;

            track.timer = setTimeout(() => {
                if (track.transitionHandler && !track.isPaused) {
                    danmaku.removeEventListener('transitionend', track.transitionHandler);
                    track.transitionHandler = null;
                    playNextInTrack(track);
                }
            }, remainingDuration * 1000 + 500);
        }

        tracks.forEach((track) => {
            const danmaku = track.currentDanmaku;
            danmaku.addEventListener('mouseenter', () => pauseTrack(track));
            danmaku.addEventListener('mouseleave', () => resumeTrack(track));
        });

        tracks.forEach((track, idx) => {
            setTimeout(() => playNextInTrack(track), idx * 400);
        });

        let resizeTimer = null;
        function resetAllTracks() {
            tracks.forEach(track => {
                if (track.isPaused) track.isPaused = false;
                if (track.timer) clearTimeout(track.timer);
                if (track.transitionHandler) {
                    track.currentDanmaku.removeEventListener('transitionend', track.transitionHandler);
                    track.transitionHandler = null;
                }
                const danmaku = track.currentDanmaku;
                const currentText = danmaku.textContent;
                if (currentText && currentText.length > 0) {
                    danmaku.style.transition = 'none';
                    danmaku.style.left = '100%';
                    void danmaku.offsetHeight;
                    const containerW = getContainerWidth();
                    const duration = getDuration(danmaku, containerW);
                    const endLeft = -danmaku.offsetWidth;
                    danmaku.style.transition = `left ${duration}s linear`;
                    danmaku.style.left = endLeft + 'px';
                    track.totalDuration = duration;
                    track.startLeft = containerW;
                    track.endLeft = endLeft;
                    const onEnd = (e) => {
                        if (e.target === danmaku) {
                            danmaku.removeEventListener('transitionend', onEnd);
                            track.transitionHandler = null;
                            track.timer = setTimeout(() => playNextInTrack(track), 300);
                        }
                    };
                    danmaku.addEventListener('transitionend', onEnd);
                    track.transitionHandler = onEnd;
                    track.timer = setTimeout(() => {
                        if (track.transitionHandler) {
                            danmaku.removeEventListener('transitionend', track.transitionHandler);
                            track.transitionHandler = null;
                        }
                        playNextInTrack(track);
                    }, duration * 1000 + 500);
                } else {
                    playNextInTrack(track);
                }
            });
        }

        window.addEventListener('resize', () => {
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resetAllTracks, 200);
        });

        window.addEventListener('beforeunload', () => {
            tracks.forEach(track => {
                if (track.timer) clearTimeout(track.timer);
                if (track.transitionHandler) {
                    track.currentDanmaku.removeEventListener('transitionend', track.transitionHandler);
                }
            });
        });
    }

    // 等待 DOM 加载完成后初始化两个弹幕墙
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // 第一个弹幕墙（价格篇）数据
        const priceText = `我在中国摔断了胳膊，打了钢钉，总共花了300美元，回到美国后，我又花了5000美元请医生“观察”我的康复情况。
我姐姐在中国住了两年，她管那里叫“医疗城”😂，她需要做个CT扫描，当天就做了，而且没用保险，只花了30美元。
顺便说一下，我用保险支付了我儿子的核磁共振费用，总共要3456.66美元😭
而我在美国，需要检测癌症的费用是52,980美元，这不是手术、放疗和激素治疗，只是检测。
在美国，你周一去，周二因破产入狱。
在美国那会是5000美元，而且要8小时。
真希望我早知道其他国家的牙科治疗......我花了33,000美元做了完整的上下牙种植体，真是个大骗子......在美国......我真是被骗了......
我仅仅因为正常分娩😫就欠了1.4万美元
当我看到我丈夫的骨髓活检账单时，光是那就有18,000美元。
而我的MRI费用却超过了1100美元，这还算扣除保险费用！🤦🏾‍♀️
天哪，我在加州做核磁共振被报价4000美元。
我上次做的核磁共振是2000美元，这就是一张高级经济舱飞往中国😭的票价。
我最近查了全身健康检查，英国的正式健康检查至少要超过1500英镑，所以我决定今年晚些时候去中国买，价格便宜很多。
我英国的私人医生第一次预约费用是800英镑，费用是650英镑。
我女儿不久前在同一家私立医院做了全面诊断检查，因为她还是个孩子，做MRI和腰穿时需要全身麻醉，检查费用超过了2万英镑。`;
        const priceLines = priceText.split(/\r?\n/);

        // 第二个弹幕墙（等待时间篇）数据
        const waitText = `过去三个月我一直在等待看耳鼻喉科专家，而仅仅为了看我的主治医生也等了五个月。这种情况一直如此。
在澳大利亚，这需要在医院等待5到7个小时🥺
在意大利，真的要花一整天时间
在南非，你甚至看不到医生，只能等着死亡降临......
我因为偏头痛严重去了医院（我有偏瘫性偏头痛，我坐在长椅上直到偏头痛消失后才回家🤣🤣🤣
在英国，最多可达3-5个工作年🤔。
在加拿大——12小时，零医疗费——但停车费32美元😂
一点也不夸张，英国人可能会在A+E的椅子上等好几天，等待床位或治疗。NHS已经结束了。
在德国，经过数小时的等待，他们会让你回家，说：这不是紧急情况。如果宝宝还没生病，明天回家去看你的常规医生。
在英国，你能预约的第一个预约是明年，保证
在澳大利亚，如果你需要看专科医生，预约大约需要3到6个月。
在印度尼西亚，你早上5点来，第二天早上5点离开
在西班牙，你打电话给专家，他们的议程将在3-4个月内开放
我有严重的头痛，和颈椎相关的疼痛，三个月后做了一次循环医学检查（RMI）🙄
我在马德里的同事等了4个月才见专科医生，他去看了医生，医生3个月前退休了，他们也没把预约更新给其他医生。 🤦🏻 ♀️
在德国，他们只有6个月后才会给你预约，而且预约时间也只有5分钟，因为都是因为✨压力✨
在丹麦是免费的，但时间很长。说实话，我觉得除非我已经在流血（也就是他们很容易看出问题之前，我可能会在得到帮助之前去世。 🙃）
在马来西亚，政府诊所只需RM 1或RM 2。但你需要等待的时间，请半天或整天假💀
在瑞典，这需要2-3个工作年。
在南非，你下午5点就瞎了🤦🏽
英国绝对不可能！是的，NHS确实很困难，但我不得不在急诊室等了整整6个小时才检查我头部的开放性伤口，结果还是没有扫描，什么都没有
在菲律宾，这两小时只是医生等待游戏的一部分
马来西亚的公共医疗补贴很大。但代价是效率（等待时间非常长、医护人员工资低、基础设施不足等。）
在加拿大，这大约需要18个月`;
        const waitLines = waitText.split(/\r?\n/);

        createDanmakuWall('danmakuContainer1', priceLines);
        createDanmakuWall('danmakuContainer2', waitLines);
    }
})();