
# NFT Staking App

Tài liệu này nhằm hướng dẫn nhà phát triển qua quá trình tiếp tục phát triển ứng dụng Stake NFT. Nó cung cấp cái nhìn tổng quan về cấu trúc mã nguồn hiện tại, các thực tiện tốt để tuân thủ, và các bước để triển khai các tính năng mới.

### Yêu Cầu Tiên Quyết

- Các yêu cầu tiên quyết cho môi trường phát triển:
  - Cài đặt Node.js và npm.
  - Có kiến thức về React, Ethereum và Solidity.

## Nội dung

### 1. **Hiểu Về Stake NFT và ERC-20/ERC-1155**

- **NFT**: là viết tắt của **_"Non-Fungible Token"_** - dạng _Token_ dựa trên blockchain đại diện cho tài sản hoặc đối tượng kỹ thuật số duy nhất và không thể chia nhỏ. NFT không thể thay thế và thường được sử dụng để xác minh quyền sở hữu và giao dịch tài sản kỹ thuật số độc nhất.
- Định nghĩa về Stake NFT:

  - **Stake (Đặt cọc):** Trong ngữ cảnh tài chính và blockchain, **_"stake"_** là việc người dùng đặt cọc một số lượng tiền hoặc tài sản kỹ thuật số để tham gia vào một mạng blockchain hoặc giao thức. Hành động này thường được thực hiện để đảm bảo tính an toàn và an toàn cho mạng, cũng như để nhận được phần thưởng hoặc lợi ích trong quá trình giao dịch và chia sẻ dữ liệu.

  - **Stake NFT (Đặt cọc NFT):** là quá trình người dùng đặt cọc một hoặc nhiều NFT _(Non-Fungible Token)_ vào hệ thống hoặc dịch vụ cụ thể. Bằng cách thực hiện hành động này, người dùng có thể nhận được các lợi ích hoặc phần thưởng liên quan đến việc giữ NFT trong một khoảng thời gian cố định. Việc stake NFT có thể được sử dụng để tham gia vào các hoạt động như trò chơi, thị trường NFT, hoặc các nền tảng DeFi _(Decentralized Finance)_ trên blockchain.
  - **Ví dụ:** Trong hệ thống "NFT Staking", người dùng có thể đặt cọc NFT của họ để tham gia vào quá trình giao dịch và kiếm lợi nhuận. Các NFT này có thể là các phiên bản độc nhất của nghệ sĩ hoặc tài sản kỹ thuật số khác. Việc stake NFT có thể giúp người dùng kiếm thêm token hoặc lợi ích khác thông qua việc giữ NFT trong khoảng thời gian xác định.

- Định nghĩa về ERC-20 và ERC-1155:
  **Token ERC-20** là một loại tiêu chuẩn cho các token trên nền tảng blockchain Ethereum. ERC-20 là viết tắt của _"Ethereum Request for Comments 20"_, và đây là một giao thức chuẩn được đề xuất để tạo và quản lý các token dựa trên blockchain Ethereum. Các token ERC-20 thường được sử dụng để đại diện cho các tài sản hoặc giá trị khác nhau trên blockchain và có tính năng tương tự như tiền tệ.

  - **Các Đặc Điểm Tiêu Chuẩn của Token ERC-20:**

    1.  **Transferable (Có thể Chuyển giao):** Các token ERC-20 có thể dễ dàng chuyển giao từ một địa chỉ ví Ethereum sang một địa chỉ ví khác thông qua giao dịch.

    2.  **Divisibility (Có thể Chia nhỏ):** Mỗi token ERC-20 có thể được chia nhỏ thành các đơn vị nhỏ hơn, cho phép giao dịch với số lượng token chính xác.

    3.  **Interoperability (Tương tác được):** Các token ERC-20 tuân theo cách thức tiêu chuẩn chung, điều này giúp chúng tương tác một cách dễ dàng với các dịch vụ và ứng dụng khác nhau trên nền tảng Ethereum.

    4.  **Decimals (Số Thập phân):** Mỗi token ERC-20 có một tham số "decimals" xác định số chữ số sau dấu thập phân mà token có thể được chia nhỏ. Ví dụ, nếu decimals = 18, token có thể chia nhỏ đến 18 chữ số sau dấu thập phân.

    5.  **Total Supply (Tổng Cung cấp):** Mỗi token ERC-20 có một số lượng cung cấp tối đa xác định trước được quy định trong hợp đồng thông minh.

    6.  **Balance Inquiry (Kiểm tra Số dư):** Người dùng có thể kiểm tra số dư của token ERC-20 của họ bằng cách sử dụng các dịch vụ ví hoặc khám phá khối blockchain.

    7.  **Standard Functions (Các Hàm Tiêu Chuẩn):** Các token ERC-20 tuân theo một tập hợp các hàm tiêu chuẩn, bao gồm `transfer` (chuyển giao token), `balanceOf` (xem số dư), và nhiều hàm khác.

  **Token ERC-1155** là một tiêu chuẩn tiên tiến hơn cho việc tạo và quản lý các loại tài sản khác nhau trên nền tảng blockchain Ethereum. Được giới thiệu sau ERC-20, ERC-1155 cung cấp khả năng gộp chung nhiều loại tài sản trong cùng một hợp đồng thông minh, mang lại hiệu suất và linh hoạt cao hơn.

  - **Các Đặc Tính Của Token ERC-1155:**

    1.  **Multi-Token Standard (Tiêu Chuẩn Đa Token):** ERC-1155 cho phép một hợp đồng thông minh tạo ra và quản lý nhiều loại tài sản khác nhau cùng lúc. Điều này giúp tối ưu hóa việc triển khai và quản lý hợp đồng thông minh.

    2.  **Economic Efficiency (Hiệu Suất Kinh Tế):** So với việc triển khai nhiều hợp đồng thông minh độc lập cho từng loại tài sản, ERC-1155 giúp tiết kiệm chi phí gas và tối ưu hóa tài nguyên mạng.

    3.  **Batch Operations (Các Thao Tác Theo Lô):** ERC-1155 cho phép thực hiện nhiều thao tác liên quan đến nhiều loại tài sản trong cùng một giao dịch, giảm độ trễ và chi phí gas.

    4.  **Flexibility (Tính Linh Hoạt):** Mỗi token trong hợp đồng ERC-1155 có thể tuân theo cả hai tiêu chuẩn ERC-20 và ERC-721. Điều này mang lại khả năng tạo ra các ứng dụng phong phú, từ việc tạo token đơn giản đến việc phát hành NFTs.

    5.  **Batch Transfers (Chuyển Giao Theo Lô):** Người dùng có thể chuyển giao nhiều loại tài sản cùng lúc trong một giao dịch duy nhất, giúp tối ưu hóa trải nghiệm người dùng.

    6.  **Single Contract (Hợp Đồng Đơn):** Mọi token và tài sản liên quan đến ERC-1155 được quản lý trong cùng một hợp đồng thông minh, giảm độ phức tạp của việc quản lý nhiều hợp đồng.

  - **Mối Liên Kết Trong Dự Án:**

    - **Staking và Belonging:** Token ERC-1155 đại diện cho tài sản NFT mà người dùng có thể stake và tích lũy giá trị.
    - **Reward Distribution:** Token ERC-20 được sử dụng để phân phối phần thưởng cho người dùng tham gia vào staking. Các NFTs ERC-1155 có thể được sử dụng như là yếu tố tham gia chính thức vào quá trình staking và định giá giá trị thưởng.

### 2. **Hiểu Về Mã Nguồn Hiện Tại**

- **Tổng quan về cấu trúc dự án và các thành phần**

  Dự án có một cấu trúc chặt chẽ với nhiều thành phần quan trọng để triển khai chức năng staking và quản lý tài sản NFT trên mạng Ethereum. Dưới đây là tổng quan về cấu trúc dự án và các thành phần chính:

  - **Smart Contracts:**
    Trong dự án, các hợp đồng thông minh (smart contracts) đóng vai trò quan trọng. Đây là mã nguồn chứa các quy tắc và hành động mà hệ thống sẽ thực hiện tự động. Trong trường hợp này, smart contracts dùng để triển khai chức năng staking và quản lý tài sản NFT.

  - **Giao Diện Người Dùng (UI):**
    Đây là nơi người dùng có thể xem thông tin về tài sản, thực hiện các hành động staking và unstaking, và theo dõi phần thưởng của họ. UI cung cấp giao diện trực quan để tương tác với hệ thống.

  - **Hàm Thông Qua Ethers API:**
    Trong dự án, Ethers API dùng để tương tác với blockchain Ethereum từ giao diện người dùng. Điều này cho phép gửi và nhận thông tin từ các smart contracts, thực hiện giao dịch và cập nhật dữ liệu trên blockchain.

  - **Xử Lý Logic Chức Năng:**
    Logic chức năng của dự án bao gồm các hành động như staking, unstaking và tính toán phần thưởng. Đây là phần quan trọng xác định cách hệ thống hoạt động và tương tác với các thành phần khác.

  Tổng quan về cấu trúc dự án và các thành phần chính giúp ta hiểu cách mỗi phần gắn liền với chức năng staking và quản lý tài sản NFT, từ đó triển khai và phát triển dự án một cách hiệu quả.

- **Thư viện và phụ thuộc quan trọng:** - **OpenZeppelin Contracts:** Đây là một bộ thư viện chứa các smart contracts sẵn có và được kiểm tra an toàn. OpenZeppelin Contracts cung cấp các hợp đồng chuẩn và các tính năng tiện ích cho việc triển khai các chức năng phổ biến như staking và quản lý NFT.

  - **ethers.js:** Tương tự như web3.js, thư viện ethers.js cũng cung cấp API để tương tác với Ethereum. Nó được coi là gọn nhẹ hơn và có cú pháp dễ đọc hơn, làm cho việc phát triển và tương tác với smart contracts trở nên thuận tiện.

  - **React:** Thư viện React giúp bạn xây dựng giao diện người dùng (UI) cho dự án của bạn. Với cú pháp dễ đọc và khả năng tái sử dụng thành phần, React là lựa chọn phổ biến để tạo UI cho các dự án web.

### 3. Lập trình smart contract

**Smart Contract NFT**
Trong mã nguồn dưới đây, một smart contract NFT được triển khai dựa trên chuẩn ERC1155. Hãy cùng tìm hiểu chi tiết về cấu trúc và chức năng của hợp đồng này:

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC1155, Ownable {
    // Cấu trúc lưu trữ thông tin chi tiết của NFT
    struct NFTDetails {
        string name;
        uint256 amount;
    }

    // ID duy nhất của NFT
    uint256 private constant NFT_ID = 0;

    // Địa chỉ IPFS cơ sở cho thông tin chi tiết của NFT
    string private constant BASE_URI = "https://bafybeihul6zsmbzyrgmjth3ynkmchepyvyhcwecn2yxc57ppqgpvr35zsq.ipfs.dweb.link/{id}.json";

    // Mapping lưu trữ thông tin chi tiết của từng NFT
    mapping(uint256 => NFTDetails) public nftDetails;

    constructor() ERC1155(BASE_URI) {
        // Tên và số lượng NFT ban đầu
        string memory name = "Charizard";
        uint256 initialAmount = 100;

        // Tạo NFT và gán cho người triển khai
        _mint(msg.sender, NFT_ID, initialAmount, "");
        nftDetails[NFT_ID] = NFTDetails(name, initialAmount);
    }

    // Trả về thông tin chi tiết của NFT
    function getTokenDetails() external view returns (uint256, string memory, uint256) {
        NFTDetails memory details = nftDetails[NFT_ID];
        return (NFT_ID, details.name, details.amount);
    }

    // Trả về số lượng NFT mà người dùng sở hữu
    function getAmount(address _owner) external view returns (uint256) {
        return balanceOf(_owner, NFT_ID);
    }
}
```

**Mô tả:**

- Smart Contract NFT này triển khai một loại NFT dựa trên chuẩn ERC1155.
- Khi triển khai, hợp đồng sẽ tạo một NFT với ID duy nhất và gán cho địa chỉ người triển khai.
- Cấu trúc `NFTDetails` lưu trữ tên và số lượng của NFT.
- `BASE_URI` là địa chỉ IPFS cơ sở cho thông tin chi tiết của NFT.
- Hàm `getTokenDetails()` trả về thông tin chi tiết của NFT, bao gồm ID, tên và số lượng.
- Hàm `getAmount(address _owner)` trả về số lượng NFT mà địa chỉ `_owner` sở hữu.

**Smart Contract NftStaker với Staking và Claiming NFT**

Dưới đây là một smart contract NftStaker cho phép người dùng staking và claiming NFT, cùng với mô tả các chức năng quan trọng của hợp đồng.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NftStaker is ERC20, ERC1155Holder, Ownable {
    // Sự kiện khi người dùng stake NFT
    event NftStaked(address indexed user, uint256 tokenId, uint256 amount);

    // Sự kiện khi người dùng unstake NFT
    event NftUnstaked(address indexed user, uint256 tokenId, uint256 amount);

    // Sự kiện khi người dùng claim phần thưởng
    event RewardClaimed(address indexed user, uint256 rewardAmount);

    // Liên kết với smart contract NFT (ERC1155)
    IERC1155 public parentNFT;

    // Tỷ lệ phần thưởng cho việc staking
    uint256 public rewardRate = 100000;

    // Giá trị token
    uint256 public tokenValue = 1;

    // Tổng số lượng NFT trong hệ thống
    uint256 public totalPoolSize = 0;

    // ID mặc định của NFT
    uint256 public defaultTokenId = 0;

    // Cấu trúc lưu trữ thông tin về việc staking
    struct Stake {
        uint256 tokenId;
        uint256 amount;
        uint256 timestamp; // Lưu thời điểm bắt đầu staking
    }

    // Mapping lưu trữ thông tin staking của từng người dùng
    mapping(address => Stake) public stakes;

    // Modifier kiểm tra xem người dùng có đủ NFT để staking hay không
    modifier hasSufficientNFTBalance(address account, uint256 amount) {
        require(
            parentNFT.balanceOf(account, defaultTokenId) >= amount &&
                amount >= 0,
            "Insufficient NFT balance"
        );
        _;
    }

    constructor(address _nft) ERC20("GameToken", "GTK") {
        parentNFT = IERC1155(_nft);
    }

    // Hàm cho phép người dùng stake NFT
    function stake(uint256 _amount)
        external
        hasSufficientNFTBalance(msg.sender, _amount)
    {
        stakes[msg.sender] = Stake(defaultTokenId, _amount, block.timestamp);
        parentNFT.safeTransferFrom(
            msg.sender,
            address(this),
            defaultTokenId,
            _amount,
            "0x00"
        );
        totalPoolSize += _amount;
        emit NftStaked(msg.sender, defaultTokenId, _amount);
    }

    // Hàm cho phép người dùng unstake NFT
    function unstake(uint256 _amount)
        external
        hasSufficientNFTBalance(msg.sender, _amount)
    {
        uint256 reward = calculateRewards(
            _amount,
            stakes[msg.sender].timestamp
        );

        _mint(msg.sender, reward);

        parentNFT.safeTransferFrom(
            address(this),
            msg.sender,
            stakes[msg.sender].tokenId,
            _amount,
            "0x00"
        );

        if (stakes[msg.sender].amount > _amount) {
            stakes[msg.sender].timestamp = block.timestamp; // Reset thời điểm bắt đầu staking
            stakes[msg.sender].amount -= _amount;
            totalPoolSize -= _amount;
        } else if (stakes[msg.sender].amount == _amount) {
            delete stakes[msg.sender];
        }
        emit NftUnstaked(msg.sender, stakes[msg.sender].tokenId, stakes[msg.sender].amount);
    }

    // Hàm cho phép người dùng claim phần thưởng
    function claim() external hasSufficientNFTBalance(msg.sender, 0) {
        uint256 reward = calculateRewards(
            stakes[msg.sender].amount,
            stakes[msg.sender].timestamp
        );

        _mint(msg.sender, reward);
        stakes[msg.sender].timestamp = block.timestamp; // Reset thời điểm bắt đầu staking
        emit RewardClaimed(msg.sender, reward);
    }

    // Hàm tính toán phần thưởng dựa trên thông tin staking
    function calculateRewards(uint256 stakedNFTs, uint256 stakingStartTimestamp)
        internal
        view
        returns (uint256)
    {
        uint256 stakingDuration = block.timestamp - stakingStartTimestamp;
        require(stakingDuration > 0, "Staking duration must be greater than 0");
        require(tokenValue > 0, "Token value must be greater than 0");

        return
            (stakedNFTs * rewardRate * stakingDuration * tokenValue) /
            totalPoolSize;
    }

    // Hàm trả về số lượng NFT mà người dùng đã staking
    function getStakedNFTs() public view returns (uint256) {
        return stakes[msg.sender].amount;
    }

    // Hàm trả về thời gian đã staking của người dùng
    function getStakingDuration() public view returns (uint256) {
        if (stakes[msg.sender].timestamp == 0)
            return 0;
        return block.timestamp - stakes[msg.sender].timestamp;
    }
}
```

**Mô tả:**

- Smart contract `NftStaker` cho phép người dùng staking và claiming NFT dựa trên chuẩn ERC20 và ERC1155.
- Người dùng có thể stake NFT vào hợp đồng và sau đó có thể unstake và claim phần thưởng dựa trên thời gian và số lượng NFT đã staking.
- Hợp đồng kế thừa từ các smart contract ERC20, ERC1155Holder và Ownable của OpenZeppelin.
- Hợp đồng sử dụng chuẩn ERC20 để tạo ra một token với tên "GameToken" (GTK) để thể hiện phần thưởng.
- Người dùng cần chắc chắn rằng họ có đủ NFT để staking trước khi gọi hàm stake, unstake hoặc claim.
- Các thông tin về staking và phần thưởng được tính toán dựa trên các tham số như `rewardRate`, `tokenValue`, và `stakingDuration`.

### _Hướng dẫn deploy các smart contract_

**Bước 1: Truy cập Remix Ethereum**

1.  Mở trình duyệt và truy cập vào địa chỉ: [https://remix.ethereum.org/](https://remix.ethereum.org/)

**Bước 2: Tạo Smart Contract**

1.  Bấm vào nút "File" ở góc trên bên trái và chọn "New File".
2.  Tạo một file mới với tên tùy ý, ví dụ: "NftStaker.sol".
3.  Dán mã nguồn smart contract vào file mới tạo.

**Bước 3: Chọn Trình Biên Dịch và Triển Khai**

1.  Bấm vào tab "Solidity Compiler" ở góc trên bên phải.
2.  Chọn phiên bản Solidity phù hợp với mã nguồn smart contract.
3.  Bấm nút "Compile" để biên dịch mã nguồn.

**Bước 4: Triển Khai Smart Contract**

1.  Bấm vào tab "Deploy & Run Transactions" ở góc trên bên phải.
2.  Chọn môi trường triển khai (ví dụ: JavaScript VM, Injected Web3, hoặc mạng Ethereum thật).
3.  Dưới phần "Deploy" ở bên dưới, chọn smart contract muốn triển khai từ danh sách các contract đã biên dịch.
4.  Điền các tham số cần thiết cho việc triển khai (ví dụ: địa chỉ NFT, rewardRate, tokenValue,...).
5.  Bấm nút "Deploy" để triển khai smart contract.

**Bước 5: Xác Nhận Giao Dịch**

1.  Nếu bạn triển khai trên mạng Ethereum thật, một cửa sổ xác nhận giao dịch sẽ hiện ra.
2.  Xác nhận giao dịch bằng cách chọn loại ví tiền, điền mật khẩu và xác nhận.

**Bước 6: Đợi Triển Khai Hoàn Thành**

1.  Sau khi xác nhận, chờ đợi quá trình triển khai hoàn thành. Remix sẽ hiển thị hash của giao dịch triển khai.

**Bước 7: Quản Lý Smart Contract**

1.  Khi smart contract đã được triển khai thành công, bạn có thể quản lý và tương tác với nó thông qua các chức năng đã được định nghĩa trong smart contract.

**Lưu ý** : Sau khi deploy 2 smart contract trên, phải gọi hàm `setAprovalForAll` cho `NFTStaker` trong smart contract `NFT`.

**Lưu ý**: Trong quá trình triển khai trên mạng Ethereum thật, bạn sẽ cần có Ether để trả phí giao dịch. Hãy đảm bảo bạn đã kết nối với ví Ethereum hoặc mạng Ethereum thật trước khi triển khai.

### 4. **Bắt Đầu**

### Bắt đầu Dự án NFT Staking

Dưới đây là các bước ngắn gọn để bắt đầu dự án NFT Staking của bạn:

**Bước 1: Sao chép dự án từ GitHub**

- Mở terminal và chạy `git clone https://github.com/vietddude/stake-nft.git`.

**Bước 2: Cài đặt phụ thuộc**

- Trong thư mục dự án, chạy `npm install` để cài đặt các phụ thuộc.

**Bước 3: Thiết lập biến môi trường**

- Trong thư mục `.\src\contracts` chỉnh sửa các file `<*>-abi.json` và `<*>-address.json` để kết nối tới các smart contract.

### Bắt đầu phát triển
- Sử dụng `npm start` để khởi chạy dự án trong môi trường phát triển.

### 5. Các Chức Năng Chính

Dưới đây là mô tả về các chức năng chính trong ứng dụng và luồng hoạt động của từng chức năng:

- **Hiển thị Thông tin Token và Số Dư:**
Sau khi người dùng kết nối ví tiền thành công, thông tin về token và số dư trong ví của họ sẽ được hiển thị ở phần đầu trang. Tên token và biểu tượng cũng sẽ được hiển thị.

- **Stake (Gửi vào giao dịch):**
Người dùng có thể gửi token NFT vào giao dịch bằng cách nhập số lượng token và nhấn nút "Stake". Khi gửi token NFT, giao dịch sẽ được tạo và người dùng sẽ thấy thông báo đang chờ giao dịch.

- **Unstake (Rút khỏi giao dịch):**
Người dùng có thể rút token NFT khỏi giao dịch bằng cách nhập số lượng token và nhấn nút "Unstake". Giao dịch sẽ được tạo và người dùng sẽ thấy thông báo đang chờ giao dịch.

- **Claim (Nhận phần thưởng):**
Khi người dùng đã gửi token NFT vào giao dịch, họ có thể nhấn nút "Claim" để nhận phần thưởng. Phần thưởng sẽ được tính toán dựa trên số lượng token NFT đã gửi và thời gian đã gửi. Giao dịch sẽ được tạo và người dùng sẽ thấy thông báo đang chờ giao dịch.

- **Hiển thị Thông tin Staking:**
Ở phần dưới cùng của trang, thông tin về số lượng token NFT đang được stake và thời gian đã staking sẽ được hiển thị.

### Luồng Hoạt Động Các Chức Năng:

1. **Kết nối Ví Tiền:**

   - Người dùng nhấn nút "Connect Wallet".
   - Cửa sổ MetaMask (hoặc ví tiền khác) hiện ra yêu cầu xác nhận kết nối.
   - Người dùng xác nhận kết nối.
   - Ứng dụng hiển thị thông tin ví và số dư.

2. **Stake (Gửi vào giao dịch):**

   - Người dùng nhập số lượng token NFT cần gửi vào giao dịch.
   - Người dùng nhấn nút "Stake".
   - Ứng dụng tạo giao dịch stake và hiển thị thông báo chờ giao dịch.
   - Giao dịch stake được gửi tới mạng Ethereum.
   - Khi giao dịch được xác nhận, số lượng token NFT trong giao dịch được cộng vào số lượng đang stake.

3. **Unstake (Rút khỏi giao dịch):**

   - Người dùng nhập số lượng token NFT cần rút khỏi giao dịch.
   - Người dùng nhấn nút "Unstake".
   - Ứng dụng tạo giao dịch unstake và hiển thị thông báo chờ giao dịch.
   - Giao dịch unstake được gửi tới mạng Ethereum.
   - Khi giao dịch được xác nhận, số lượng token NFT trong giao dịch được rút khỏi số lượng đang stake.

4. **Claim (Nhận phần thưởng):**

   - Người dùng nhấn nút "Claim".
   - Ứng dụng tính toán phần thưởng dựa trên số lượng token NFT đã stake và thời gian đã staking.
   - Ứng dụng tạo giao dịch claim và hiển thị thông báo chờ giao dịch.
   - Giao dịch claim được gửi tới mạng Ethereum.
   - Khi giao dịch được xác nhận, phần thưởng sẽ được cộng vào số dư của người dùng.

5. **Hiển thị Thông Tin Staking:**
   - Ứng dụng liên tục cập nhật số lượng token NFT đang được stake và thời gian đã staking.

### Giải thích code cho các chức năng chính trong ứng dụng:

- **Kết nối Ví Tiền:**

	Trong hàm `_connectWallet()`, ứng dụng sử dụng `window.ethereum.request()` để yêu cầu người dùng kết nối ví tiền. Sau khi người dùng chấp nhận kết nối, hàm `_initialize()` được gọi để khởi tạo ứng dụng với địa chỉ ví đã chọn và tạo các sự kiện lắng nghe thay đổi tài khoản.

- **Hiển thị Thông tin Token và Số Dư:**

	Hàm `_getTokenData()` gọi đến contract `Stake` để lấy thông tin về tên và biểu tượng của token. Hàm `_updateBalance()` sử dụng contract `Stake` để lấy số dư của người dùng.

- **Stake (Gửi vào giao dịch):**

	Trong hàm `_stake(amount)`, người dùng nhập số lượng token cần stake. Hàm này gọi đến hàm `stake(amount)` của contract `Stake` để thực hiện việc stake. Sau khi giao dịch được xác nhận, `_getStakeData()` được gọi để cập nhật thông tin về số lượng token NFT đang được stake.

- **Unstake (Rút khỏi giao dịch):**

	Trong hàm `_unstake(amount)`, người dùng nhập số lượng token cần rút khỏi giao dịch. Hàm này gọi đến hàm `unstake(amount)` của contract `Stake` để thực hiện việc rút khỏi giao dịch. Sau khi giao dịch được xác nhận, `_getStakeData()` và `_getTokenData()` được gọi để cập nhật thông tin.

- **Claim (Nhận phần thưởng):**

	Hàm `_claim()` gọi đến hàm `claim()` của contract `Stake` để thực hiện việc nhận phần thưởng. Sau khi giao dịch được xác nhận, `_getStakeData()` được gọi để cập nhật thông tin về số lượng token NFT đang được stake.

- **Hiển thị Thông tin Staking:**

	Trong hàm `_getStakeData()`, hàm `getStakedNFTs()` và `getStakingDuration()` của contract `Stake` được gọi để lấy thông tin về số lượng token NFT đang được stake và thời gian đã staking. Các thông tin này được cập nhật trong state để hiển thị cho người dùng.

Ngoài ra, có các hàm như `_initializeEthers()` để khởi tạo ethers và contract, `_startPollingData()` để bắt đầu polling số dư và `_stopPollingData()` để dừng polling khi component bị unmounted.

Tóm lại, mỗi chức năng chính của ứng dụng liên quan đến việc giao tiếp với contract `Stake` thông qua ethers và hiển thị kết quả tương ứng cho người dùng. Các giao dịch được tạo, gửi và xác nhận trên mạng Ethereum để thực hiện các thao tác stake, unstake và claim.

### 6. Thêm Tính Năng Mới

Dưới đây là hướng dẫn từng bước để triển khai các tính năng mới trong ứng dụng:

**1. Thêm Contract và Hiển Thị Thông Tin Mới:**

- **Miêu tả và Mục đích:**
  Giả sử bạn muốn thêm một contract mới để quản lý các loại NFT khác nhau, và bạn muốn hiển thị thông tin về số lượng NFT của từng
  loại trong giao diện người dùng.

     - **Thay đổi Contract và Giao Diện:**
        - Triển khai một contract mới tương tự như `NFT` cho từng loại NFT.
        - Cập nhật giao diện người dùng để hiển thị thông tin về từng loại NFT bằng cách gọi hàm của các contract NFT mới.

     - **Sửa đổi Mã Ví dụ:**
        - Trong các component của giao diện người dùng, cập nhật các phần liên quan đến hiển thị thông tin NFT.

 **2. Thêm Ví mới và Xử lý Giao Dịch:**

  - **Miêu tả và Mục đích:**
    Giả sử bạn muốn thêm tích hợp một loại ví tiền mới để người dùng có thể sử dụng để stake và rút khỏi giao dịch.

  - **Thay đổi Contract và Giao Diện:**

    - Thêm hợp đồng cho loại ví tiền mới.
    - Cập nhật giao diện người dùng để cho phép người dùng chọn ví tiền muốn sử dụng.

  - **Sửa đổi Mã Ví dụ:**
    - Trong các component của giao diện người dùng, cập nhật việc chọn ví tiền và thực hiện giao dịch với ví tiền mới.

  **3. Stake Nhiều Loại NFT:**

  - **Miêu tả và Mục đích:**
    Muốn cho phép người dùng stake nhiều loại NFT khác nhau cùng lúc và cập nhật thông tin cho từng loại NFT.

  - **Thay đổi Contract và Giao Diện:**

    - Cập nhật hợp đồng `Stake` để hỗ trợ nhiều loại NFT.
    - Cập nhật giao diện người dùng để cho phép người dùng chọn loại NFT khi thực hiện các thao tác stake và unstake.

  - **Sửa đổi Mã Ví dụ:**
    - Trong các component của giao diện người dùng, cập nhật việc chọn loại NFT khi thực hiện stake và unstake.

  **4. Thêm Thông Tin Mới:**

  - **Miêu tả và Mục đích:**
    Muốn thêm thông tin mới về tỷ lệ phần thưởng, giá trị token, và kích thước tổng cộng của pool.

  - **Thay đổi Contract và Giao Diện:**

    - Thêm các hàm getter mới vào hợp đồng `Stake` để lấy thông tin mới.
    - Cập nhật giao diện người dùng để hiển thị các thông tin mới.

  - **Sửa đổi Mã Ví dụ:**
    - Trong các component của giao diện người dùng, cập nhật việc hiển thị các thông tin mới.

  **5. Kiểm Tra và Xem Xét:**

  Trước khi triển khai, bạn nên:

  - **Kiểm tra Thử Nghiệm:** Thử nghiệm ứng dụng với các trường hợp sử dụng khác nhau để đảm bảo tính ổn định và đúng đắn của các tính năng mới.
  - **Kiểm tra Tích Hợp:** Kiểm tra tích hợp giữa giao diện người dùng và các hợp đồng thông minh mới để đảm bảo tương thích và chính xác.
  - **Xem Xét Bảo Mật:** Đảm bảo rằng các thay đổi trong hợp đồng thông minh được kiểm tra cẩn thận để tránh lỗ hổng bảo mật.

  Tất cả các thay đổi và cập nhật nên được thực hiện theo quy trình kiểm tra cẩn thận để đảm bảo tính ổn định và chính xác của ứng dụng sau khi triển khai các tính năng mới.

### **Ví dụ về việc thêm tính năng mới "Stake Nhiều Loại NFT"**

1.  **Thay đổi Hợp Đồng Stake:**

   -  **Miêu tả và Mục đích:** Muốn cho phép người dùng stake nhiều loại NFT khác nhau.

   -  **Thay đổi Hợp Đồng Stake:**

	    - Thêm một mapping để lưu số lượng NFT staked của mỗi loại.
	    - Thay đổi hàm `stake` để nhận thêm tham số `tokenId` cho loại NFT.

   ```
    contract NftStaker is ERC20, ERC1155Holder, Ownable {
        // Existing code...

        mapping(address => mapping(uint256 => uint256)) public stakedNFTsByType;

        function stake(uint256 _amount, uint256 _tokenId)
            external
            hasSufficientNFTBalance(msg.sender, _amount)
        {
            stakes[msg.sender] = Stake(_tokenId, _amount, block.timestamp);
            parentNFT.safeTransferFrom(
                msg.sender,
                address(this),
                _tokenId,
                _amount,
                "0x00"
            );
            totalPoolSize += _amount;

            // Update the stakedNFTsByType mapping
            stakedNFTsByType[msg.sender][_tokenId] += _amount;

            emit NftStaked(msg.sender, _tokenId, _amount);
        }

        // Existing code...
    }
   ```

2.  **Cập nhật Giao Diện Người Dùng:**

   -  **Miêu tả và Mục đích:** Cập nhật giao diện để cho phép người dùng chọn loại NFT khi thực hiện stake và unstake.

   -  **Cập nhật Giao Diện Người Dùng:**

	    - Cập nhật component `Stake` và `Unstake` để cho phép người dùng chọn loại NFT khi thực hiện thao tác.

```
    // ... Existing code ...

    export class Stake extends React.Component {
        // Existing code...

        render() {
            return (
                <div>
                    {/* ... Existing UI elements ... */}
                    <select
                        value={this.state.selectedTokenId}
                        onChange={this.handleTokenChange}
                    >
                        <option value={0}>Type 1</option>
                        <option value={1}>Type 2</option>
                        {/* Add options for other types... */}
                    </select>
                    <button onClick={() => this.stake()}>Stake</button>
                </div>
            );
        }
    }

    export class Unstake extends React.Component {
        // Existing code...

        render() {
            return (
                <div>
                    {/* ... Existing UI elements ... */}
                    <select
                        value={this.state.selectedTokenId}
                        onChange={this.handleTokenChange}
                    >
                        <option value={0}>Type 1</option>
                        <option value={1}>Type 2</option>
                        {/* Add options for other types... */}
                    </select>
                    <button onClick={() => this.unstake()}>Unstake</button>
                </div>
            );
        }
    }

    // ... Existing code ...
```

3. **Cập nhật Mã Ví Dụ:**

   - **Miêu tả và Mục đích:** Cập nhật các hàm xử lý giao dịch để cho phép người dùng chọn loại NFT khi thực hiện stake và unstake.

   - **Cập nhật Mã Ví Dụ:**

	    - Trong các hàm `_stake` và `_unstake`, cập nhật việc gọi hàm `stake` và `unstake` của hợp đồng với thêm tham số `tokenId`.
```
    // ... Existing code ...

    export class Dapp extends React.Component {
        // ... Existing code ...

        async _stake(amount) {
            try {
                this.setState({ stakingDuration: 0 });
                const tx = await this._staker.stake(amount, this.state.selectedTokenId);
                // ... Existing code ...
            } catch (error) {
                // ... Existing code ...
            }
        }

        async _unstake(amount) {
            try {
                this.setState({ stakingDuration: 0 });
                const tx = await this._staker.unstake(amount, this.state.selectedTokenId);
                // ... Existing code ...
            } catch (error) {
                // ... Existing code ...
            }
        }

        // ... Existing code ...
    }

    // ... Existing code ...
```

### 7.  **Xử Lý Giao Dịch**
   Để quản lý giao dịch Ethereum và tương tác với blockchain, bạn cần sử dụng thư viện `ethers.js`, một thư viện phổ biến cho việc tương tác với Ethereum blockchain. Dưới đây là hướng dẫn về cách gửi giao dịch, theo dõi sự kiện giao dịch và xử lý lỗi giao dịch trong ứng dụng của bạn.

  1.  **Gửi Giao Dịch:**

      Để gửi một giao dịch Ethereum, bạn cần sử dụng phương thức `sendTransaction` của đối tượng `Signer`. Dưới đây là cách bạn có thể gửi giao dịch:

        ```
        // Assuming you have a connected Signer instance
        async function sendTransaction(toAddress, value) {
            try {
                const txResponse = await signer.sendTransaction({
                    to: toAddress,
                    value: ethers.utils.parseEther(value.toString()), // Convert value to wei
                });
                console.log("Transaction sent:", txResponse.hash);
                return txResponse.hash;
            } catch (error) {
                console.error("Transaction error:", error);
                throw error;
            }
        }
        ```

  2.  **Theo Dõi Sự Kiện Giao Dịch:**

      Để theo dõi sự kiện của một giao dịch, bạn có thể sử dụng phương thức `wait` của đối tượng `TransactionResponse`. Dưới đây là cách bạn có thể theo dõi sự kiện:

        ```
        async function waitForTransaction(txHash) {
            try {
                const txReceipt = await provider.waitForTransaction(txHash);
                if (txReceipt.status === 1) {
                    console.log("Transaction successful!");
                    // Handle success case
                } else {
                    console.log("Transaction failed!");
                    // Handle failure case
                }
            } catch (error) {
                console.error("Transaction error:", error);
                throw error;
            }
        }
        ```

    3.  **Xử Lý Lỗi Giao Dịch:**

        Khi gửi giao dịch, có thể xảy ra nhiều loại lỗi, bao gồm lỗi từ người dùng từ chối giao dịch, không đủ ETH để trả phí gas, lỗi hợp đồng thông minh, vv. Dưới đây là cách bạn có thể xử lý lỗi giao dịch:

        ```
        	async function sendTransaction(toAddress, value) {
        	    try {
        	        // ... Sending transaction code ...

        	        // Wait for the transaction to be mined
        	        const txReceipt = await txResponse.wait();

        	        if (txReceipt.status === 1) {
        	            console.log("Transaction successful!");
        	            // Handle success case
        	        } else {
        	            console.log("Transaction failed!");
        	            // Handle failure case
        	        }
        	    } catch (error) {
        	        if (error.code === ethers.utils.Logger.errors.CALL_EXCEPTION) {
        	            console.log("Contract execution error!");
        	            // Handle contract execution error
        	        } else if (error.code === ethers.utils.Logger.errors.TRANSACTION_REVERTED) {
        	            console.log("Transaction reverted!");
        	            // Handle transaction reverted error
        	        } else if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        	            console.log("Transaction rejected by user!");
        	            // Handle user rejection
        	        } else {
        	            console.error("Transaction error:", error);
        	            // Handle other errors
        	        }
        	        throw error;
        		}
        	}
        ```

### 8. **Kiểm Tra Và Triển Khai**

_ongoing_ 🚧
