// 动态用户配置文件
// 可以在这里添加、修改或删除用户账号和密码

const USER_CREDENTIALS = {
    // 用户列表 - 可以添加多个用户
    users: [
        {
            username: 'ktwx',
            password: '123456'
        },
        {
            username: '梁金山',
            password: '123456'
        },
        {
            username: 'manager',
            password: 'manager@2024'
        }
    ],
    
    // 获取所有用户
    getAllUsers: function() {
        return this.users;
    },
    
    // 验证用户凭据
    validateUser: function(username, password) {
        return this.users.some(user => 
            user.username === username && user.password === password
        );
    },
    
    // 添加新用户（仅用于动态测试）
    addUser: function(username, password) {
        // 检查用户名是否已存在
        if (this.users.some(user => user.username === username)) {
            console.warn(`用户名 "${username}" 已存在`);
            return false;
        }
        this.users.push({ username, password });
        console.log(`用户 "${username}" 添加成功`);
        return true;
    },
    
    // 删除用户
    removeUser: function(username) {
        const index = this.users.findIndex(user => user.username === username);
        if (index !== -1) {
            this.users.splice(index, 1);
            console.log(`用户 "${username}" 删除成功`);
            return true;
        }
        console.warn(`用户 "${username}" 不存在`);
        return false;
    },
    
    // 修改用户密码
    updateUserPassword: function(username, newPassword) {
        const user = this.users.find(user => user.username === username);
        if (user) {
            user.password = newPassword;
            console.log(`用户 "${username}" 密码修改成功`);
            return true;
        }
        console.warn(`用户 "${username}" 不存在`);
        return false;
    },
    
    // 检查用户名是否存在
    userExists: function(username) {
        return this.users.some(user => user.username === username);
    }
};

// 可选：本地存储功能（保存用户设置）
if (typeof localStorage !== 'undefined') {
    try {
        // 尝试从本地存储加载用户数据
        const savedUsers = localStorage.getItem('cost_calculator_users');
        if (savedUsers) {
            const parsedUsers = JSON.parse(savedUsers);
            if (Array.isArray(parsedUsers) && parsedUsers.length > 0) {
                USER_CREDENTIALS.users = parsedUsers;
                console.log('从本地存储加载用户数据成功');
            }
        }
        
        // 保存用户数据到本地存储的方法
        USER_CREDENTIALS.saveToLocalStorage = function() {
            try {
                localStorage.setItem('cost_calculator_users', JSON.stringify(this.users));
                return true;
            } catch (e) {
                console.error('保存到本地存储失败:', e);
                return false;
            }
        };
        
        // 清空本地存储的方法
        USER_CREDENTIALS.clearLocalStorage = function() {
            try {
                localStorage.removeItem('cost_calculator_users');
                return true;
            } catch (e) {
                console.error('清空本地存储失败:', e);
                return false;
            }
        };
        
    } catch (e) {
        console.error('本地存储操作失败:', e);
    }
}

// 导出配置（如果需要的话）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = USER_CREDENTIALS;
}

// 使用示例（可以在浏览器控制台中执行）：
// 1. 添加新用户: USER_CREDENTIALS.addUser('test', 'test123')
// 2. 删除用户: USER_CREDENTIALS.removeUser('test')
// 3. 修改密码: USER_CREDENTIALS.updateUserPassword('admin', 'newpassword')
// 4. 保存到本地存储: USER_CREDENTIALS.saveToLocalStorage()
