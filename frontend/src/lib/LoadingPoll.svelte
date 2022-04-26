<div class="grid grid-rows-4 mt-52 grid-flow-col gap-4">
    <h1 class="text-2xl mx-auto my-auto">Loading Poll</h1>
    <div class="body mx-auto my-auto">
        <div class="loading">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    </div>
</div>
<!--Author alphardex Link: https://codepen.io/alphardex/pen/XWWWBmQ-->


<style>
    .body {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
    }

    .loading {
        display: flex;
    }

    .loading .dot {
        position: relative;
        width: 2em;
        height: 2em;
        margin: 0.8em;
        border-radius: 50%;
        padding-right: 30px;
    }

    .loading .dot::before {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        background: inherit;
        border-radius: inherit;
        animation: wave 2s ease-out infinite;
    }

    .loading .dot:nth-child(1) {
        background: #e0e7ff;
    }

    .loading .dot:nth-child(1)::before {
        animation-delay: 0.2s;
    }

    .loading .dot:nth-child(2) {
        background: #c7d2fe;
    }

    .loading .dot:nth-child(2)::before {
        animation-delay: 0.4s;
    }

    .loading .dot:nth-child(3) {
        background: #a5b4fc;
    }

    .loading .dot:nth-child(3)::before {
        animation-delay: 0.6s;
    }

    .loading .dot:nth-child(4) {
        background: #818cf8;
    }

    .loading .dot:nth-child(4)::before {
        animation-delay: 0.8s;
    }

    .loading .dot:nth-child(5) {
        background: #6366f1;
    }

    .loading .dot:nth-child(5)::before {
        animation-delay: 1s;
    }

    @keyframes wave {
        50%, 75% {
            transform: scale(2.5);
        }
        80%, 100% {
            opacity: 0;
        }
    }
</style>