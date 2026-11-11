<?php

namespace AgeGate\Utility;

use Exception;

class Encrypt
{

    private const LEGACY_KEY = 'nUE4At3gpBqoFnVgG4Fd8zMR3DgTvCxa';
    private const LEGACY_IV = 'OglthbwSgkCgw4yw2CauWUXXUVAHRQyI';

    private string $secretKey;
    private string $secretIv;
    private string $key;
    private string $iv;

    public function __construct()
    {
        $this->secretKey = $_ENV['AGE_GATE_SECRET'] ?? $this->secret('age_gate_encrypt_key');
        $this->secretIv = $_ENV['AGE_GATE_IV'] ?? $this->secret('age_gate_encrypt_secret');
        $this->key = hash('sha256', $this->secretKey);
        $this->iv = substr(hash('sha256', $this->secretIv), 0, 16);
    }

    /**
     * Encrypt the string
     *
     * @param string $string
     * @return string
     */
    public function encrypt(string $string): string
    {
        try {
            return openssl_encrypt($string, "AES-256-CBC", $this->key, 0, $this->iv);
        } catch (Exception $e) {
            return base64_encode($string);
        }
    }

    /**
     * Decrypt the string
     *
     * @param string $string
     * @return string
     */
    public function decrypt(string $string): string
    {
        try {
            $value = openssl_decrypt($string, 'AES-256-CBC', $this->key, 0, $this->iv);
            if ($value === false && time() < (int) get_option('age_gate_legacy_key_until', 0)) {
                $value = openssl_decrypt(
                    $string,
                    'AES-256-CBC',
                    hash('sha256', self::LEGACY_KEY),
                    0,
                    substr(hash('sha256', self::LEGACY_IV), 0, 16)
                );
            }

            return (string) $value;
        } catch (Exception $e) {
            return base64_decode($string);
        }
    }

    /**
     * Retrieve or generate the key
     *
     * @param string $option
     * @return string
     */
    private function secret(string $option): string
    {
        if (!$value = get_option($option)) {
            $value = bin2hex(random_bytes(32));
            update_option($option, $value);
        }

        return $value;
    }
}
