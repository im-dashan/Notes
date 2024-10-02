# HTML代码片段

<br>

`显示数据`

```html
<!-- 散标start -->
    <div class="mainBox pro-body disperse-pro clearfix">
        <div class="new-pro-icon"><img th:src="@{/images/new-pro-icon.png}"/></div>

        <div th:each="loanInfoS:${loanInfoSList}">
            <!-- 1:已满标时追加pro-full-->
            <div th:class="${loanInfoS.leftProductMoney eq 0 ? 'pro-box pro-full' : 'pro-box'}">
                <div class="pro-top">
                    <h3 th:text="${loanInfoS.productName}">个人信用消费借款</h3>
                    <p th:text="${loanInfoS.productDesc}">动力金融网特选小额理财产品</p>
                </div>
                <div class="pro-main">
                    <div class="pro-rate">
                        <div class="rate" th:text="|${loanInfoS.rate}%|">4.9<span>%</span></div>
                        <h3>历史年化收益率</h3>
                    </div>
                    <div class="pro-data clearfix">
                        <div class="pro-cycle">
                            <h3>投资周期</h3>
                            <div class="data"><span
                                    th:text="${loanInfoS.productType eq 0 ? loanInfoS.cycle + '天' : loanInfoS.cycle + '个月'}">1个月</span>
                            </div>
                        </div>
                        <div class="pro-money">
                            <h3>剩余可投金额</h3>
                            <div class="data">
                                <span th:text="|${loanInfoS.leftProductMoney}元|">500000.0元</span>
                            </div>
                        </div>
                    </div>
                    <div class="pro-btn">
                        <a th:href="@{/loan/loanInfo}" class="btn-1">立即投资</a>
                    </div>
                </div>
            </div>
            <div th:if="${loanInfoSStat.count % 4 eq 0}">
                <div style="line-height:25px;">&nbsp;</div>
            </div>
        </div>
    </div>
```

